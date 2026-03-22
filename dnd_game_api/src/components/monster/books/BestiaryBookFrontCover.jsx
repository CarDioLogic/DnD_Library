import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookFrontCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
      >
        <h1 className="text-4xl font-bold mb-4">Bestiary</h1>
        <p className="text-lg">
          Welcome to the Bestiary! This tome contains detailed information about various monsters.
        </p>
      </Page>
    );
  }
);

BestiaryBookFrontCover.displayName = "BestiaryBookFrontCover";

export default BestiaryBookFrontCover;