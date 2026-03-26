import { forwardRef } from "react";
import Page from "./Page";

const BookFrontCover = forwardRef(
  ({ pageNumber, currentPage, title }, ref) => {

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        className="book-cover-overlay text-yellow-400"    
      >
        <div className="border h-full w-full flex flex-col items-center justify-center p-8">
            <h1 className="text-center text-4xl font-bold mb-4 font-uncial">{title}</h1>
        </div>
      </Page>
    );
  }
);

BookFrontCover.displayName = "BookFrontCover";

export default BookFrontCover;