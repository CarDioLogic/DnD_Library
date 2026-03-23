import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookFrontCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        className="bg-gradient-to-br from-red-700 to-gray-900 text-white"    
      >
        <div className="border h-full w-full flex flex-col items-center justify-center p-8">
            <h1 className="text-center text-4xl font-bold mb-4 font-uncial">Monster Bestiary</h1>
        </div>
      </Page>
    );
  }
);

BestiaryBookFrontCover.displayName = "BestiaryBookFrontCover";

export default BestiaryBookFrontCover;