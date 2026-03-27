import React, { forwardRef, useEffect, useRef, useState } from "react";
import Loading from "../general/Loading";
import ExtraPageContent from "./ExtraPageContent";
import Icon from "../general/Icon";

const Page = forwardRef(
  (
    {
      children,
      pagePrefix,
      pageNumber,
      currentPage,
      getPageContentFunc = null,
      className = "",
    },
    ref
  ) => {
    const [pageContent, setPageContent] = useState(children || null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [overflowingHtml, setOverflowingHtml] = useState([]);
    const [openOverFlowingContent, setOpenOverFlowingContent] = useState(false);

    const contentRef = useRef(null);

    const shouldLoadPageData =
      pageNumber - 3 === currentPage ||
      pageNumber - 2 === currentPage ||
      pageNumber - 1 === currentPage ||
      pageNumber === currentPage ||
      pageNumber + 1 === currentPage ||
      pageNumber + 2 === currentPage ||
      pageNumber + 3 === currentPage;

    useEffect(() => {
      let isMounted = true;

      async function loadContent() {
        if (children) {
          setPageContent(children);
          setIsLoading(false);
          setLoadError(null);
          return;
        }

        if (getPageContentFunc && shouldLoadPageData) {
          try {
            setIsLoading(true);
            setLoadError(null);

            const data = await getPageContentFunc();

            if (isMounted) {
              setPageContent(data);
            }
          } catch (error) {
            console.error("Failed to load page content:", error);

            if (isMounted) {
              setLoadError("Failed to load content.");
              setPageContent(null);
            }
          } finally {
            if (isMounted) {
              setIsLoading(false);
            }
          }
        }
      }

      loadContent();

      return () => {
        isMounted = false;
      };
    }, [children, shouldLoadPageData, getPageContentFunc]);

    useEffect(() => {
      if (
        isLoading ||
        loadError ||
        !pageContent ||
        !contentRef.current ||
        pageNumber !== currentPage
      ) {
        return;
      }

      const el = contentRef.current;

      const checkOverflow = () => {
        const parentRect = el.getBoundingClientRect();
        let overflowingHtml = "";

        Array.from(el.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;

          const rect = child.getBoundingClientRect();

          const isOverflowing =
            rect.left < parentRect.left ||
            rect.right > parentRect.right ||
            rect.top < parentRect.top ||
            rect.bottom > parentRect.bottom;

            child.classList.remove("invisible");
          if (isOverflowing) {
            overflowingHtml += child.outerHTML;

            child.classList.add("invisible");
          } else {
            child.classList.remove("invisible");
          }
        });

        setOverflowingHtml(overflowingHtml);

        if (pageNumber === 421) {
          console.log("OverflowingHtml children:", overflowingHtml);
        }
      };

      const timer = setTimeout(checkOverflow, 50);

      return () => clearTimeout(timer);
    }, [pageContent, isLoading, loadError, pageNumber, currentPage]);

    return (
      <section ref={ref} className="grain-wrap rounded-sm relative">
        <div className="grain-noise"></div>
        <div className="page-overlay"></div>

        <div
          ref={contentRef}
          className={`${className} h-full relative z-10 overflow-hidden border border-gray-500 shadow-inner book-page-padding rounded-sm text-book-ink font-uncial`}
        >
          {isLoading ? (
            <Loading />
          ) : loadError ? (
            <div>{loadError}</div>
          ) : (
            pageContent
          )}

          {pageNumber !== undefined && (
            <p
              className="absolute bottom-2 right-4 text-sm"
              title={`User currently on page: ${currentPage}`}
            >
              {pagePrefix}
              {pageNumber}
            </p>
          )}

          {overflowingHtml.length > 0 && (
            <>
              <div onClick={() => {setOpenOverFlowingContent(true)}}
                className="absolute top-3 right-3 border border-gray-400 rounded-sm px-2 py-1 text-sm cursor-pointer">
                <Icon                  
                  title={`View extra page content`}
                  imgSrc={`/images/general/foldedPaper.svg`}
                />
              </div>

              <ExtraPageContent
                onClose={() => {setOpenOverFlowingContent(false)}}
                isOpen={openOverFlowingContent}
                children={overflowingHtml}
              />
            </>
          )}
        </div>

      </section>
    );
  }
);

Page.displayName = "Page";

export default Page;