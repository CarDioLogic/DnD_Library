import React, { forwardRef, useEffect, useState } from "react";
import Loading from "../general/Loading";

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

    return (
      <section ref={ref} className="grain-wrap rounded-sm">
        <div className="grain-noise"></div>
        <div className="page-overlay"></div>

        <div
          className={`h-full relative z-10 overflow-hidden border border-gray-500 shadow-inner p-6 rounded-sm text-book-ink font-uncial ${className}`}
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
        </div>
      </section>
    );
  }
);

Page.displayName = "Page";

export default Page;