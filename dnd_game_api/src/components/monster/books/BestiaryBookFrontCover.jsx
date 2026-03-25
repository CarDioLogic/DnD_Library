import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookFrontCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        className="book-cover-overlay text-yellow-400"    
      >
        <div className="border h-full w-full flex flex-col items-center justify-center p-8">
            <h1 className="text-center text-4xl font-bold mb-4 font-uncial">Bestiary</h1>
        </div>
      </Page>
    );
  }
);

BestiaryBookFrontCover.displayName = "BestiaryBookFrontCover";

export default BestiaryBookFrontCover;