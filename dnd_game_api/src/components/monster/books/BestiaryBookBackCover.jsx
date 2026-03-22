import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookBackCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
      >
        <h1 className="text-4xl font-bold mb-4">Bestiary</h1>
        <p className="text-lg">
          Thank you for exploring the Bestiary! We hope you found the information about various monsters insightful and engaging.
        </p>
      </Page>
    );
  }
);

BestiaryBookBackCover.displayName = "BestiaryBookBackCover";

export default BestiaryBookBackCover;