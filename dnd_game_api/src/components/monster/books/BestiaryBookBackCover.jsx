import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryBookBackCover = forwardRef(
  ({ pageNumber, currentPage }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        className=""    
      >
        <div className="border h-full w-full flex flex-col items-center justify-center p-8">
            <p className="text-lg text-center">
            Thank you for exploring the Bestiary! We hope you found the information about various monsters insightful and engaging.
            </p>
        </div>
      </Page>
    );
  }
);

BestiaryBookBackCover.displayName = "BestiaryBookBackCover";

export default BestiaryBookBackCover;