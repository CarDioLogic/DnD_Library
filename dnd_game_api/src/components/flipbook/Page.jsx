import React, { forwardRef, useEffect, useState } from "react";

const Page = forwardRef(
  (
    {
      children,
      pageNumber,
      currentPage,
      getPageContentFunc,
      className = "",
    },
    ref
  ) => {
    const [pageContent, setPageContent] = useState(children || null);
    let shouldLoadPageData = (pageNumber - 1 == currentPage) || (pageNumber == currentPage) || (pageNumber + 1 == currentPage);

    useEffect(() => {
      let isMounted = true;

      async function loadContent() {
        if (children) {
          setPageContent(children);
          return;
        }

        if (getPageContentFunc && shouldLoadPageData) {
          try {
            const data = await getPageContentFunc();
            if (isMounted) {
              setPageContent(data);
            }
          } catch (error) {
            console.error("Failed to load page content:", error);
            if (isMounted) {
              setPageContent("Failed to load content.");
            }
          }
        }
      }

      loadContent();

      return () => {
        isMounted = false;
      };
    }, [children, shouldLoadPageData]);

    return (
      <div
        ref={ref}
        className={`demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200 ${className}`}
      >
        <div>{pageContent}</div>

        {pageNumber !== undefined && <p>Page number: {pageNumber}</p>}
        {currentPage !== undefined && <p>Page Current: {currentPage}</p>}

      </div>
    );
  }
);

export default Page;