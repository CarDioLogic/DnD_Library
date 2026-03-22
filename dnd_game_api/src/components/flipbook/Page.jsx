import React, { forwardRef, useEffect, useState } from "react";

const Page = forwardRef(
  (
    {
      children,
      number,
      getPageContentFunc,
      className = "",
    },
    ref
  ) => {
    const [pageContent, setPageContent] = useState(children || null);

    useEffect(() => {
      let isMounted = true;

      async function loadContent() {
        if (children) {
          setPageContent(children);
          return;
        }

        if (getPageContentFunc) {
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
    }, [children, getPageContentFunc]);

    return (
      <div
        ref={ref}
        className={`demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200 ${className}`}
      >
        <div>{pageContent}</div>

        {number !== undefined && <p>Page number: {number}</p>}
      </div>
    );
  }
);

export default Page;