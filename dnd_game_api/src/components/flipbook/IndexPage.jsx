import { forwardRef } from "react";
import Page from "./Page";

const IndexPage = forwardRef(
  (
    { items, itemCategoryName, pageNumber, currentPage, flipToPageHandler, pagesPerItem },
    ref
  ) => {
    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
      >
        <div>
          <h1 className="underline text-center mb-4">Index:</h1>

          {itemCategoryName && (
            <h2 className="font-bold italic">{itemCategoryName}'s:</h2>
          )}

          <ul className="ml-4 mt-2 space-y-1">
            {items.map((item) => (
              <li title={item.itemNbr}
                className="cursor-pointer text-sm flex"
                key={item.index}
                onClick={(e) => {
                  e.stopPropagation();
                  flipToPageHandler(item.itemNbr);
                }}
              >
                {Math.round(item.itemNbr / pagesPerItem)}. {item.name} {item.indexExtraContent}
              </li>
            ))}
          </ul>
        </div>
      </Page>
    );
  }
);

IndexPage.displayName = "IndexPage";

export default IndexPage;