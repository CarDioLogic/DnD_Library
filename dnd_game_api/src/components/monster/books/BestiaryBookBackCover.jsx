import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookBackCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        className="book-cover-overlay text-yellow-400"    
      >
        <div className="border h-full w-full flex flex-col items-center justify-center p-8">

        </div>
      </Page>
    );
  }
);

BestiaryBookBackCover.displayName = "BestiaryBookBackCover";

export default BestiaryBookBackCover;