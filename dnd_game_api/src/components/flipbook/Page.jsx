import React, { forwardRef, useEffect, useState } from "react";

const Page = forwardRef(
  (
    {
      children,
      pageNumber,
      currentPage,
      getPageContentFunc = null,
      className = "",
    },
    ref
  ) => {
    const [pageContent, setPageContent] = useState(children || null);

    const shouldLoadPageData =
      pageNumber - 1 === currentPage ||
      pageNumber === currentPage ||
      pageNumber + 1 === currentPage;

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
    }, [children, shouldLoadPageData, getPageContentFunc]);

    return (
      <div
        ref={ref}
        className={`demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200 ${className}`}
      >
        <div>{pageContent}</div>

        {pageNumber !== undefined && <p>Page number: {pageNumber}</p>}
        {pageNumber !== undefined && <p>Page Current: {currentPage}</p>}
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;