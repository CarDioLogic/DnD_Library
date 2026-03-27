import { useState } from "react";
import Icon from "../Icon";
import { AllBooks } from "../../../views/AllBooks";
import Page from "../../flipbook/Page";

export default function BookshelfIcon({ setCurrentBook }) {
  const [bookshelfVisible, setBookshelfVisible] = useState(false);

  const toggleBookshelf = () => {
    setBookshelfVisible((prev) => !prev);
  };

  const handleBookChange = (book) => {
    setBookshelfVisible(false);
    setCurrentBook(book);
  };

  return (
    <>
    <div className="main-page-icon" onClick={toggleBookshelf}>
      <div>
        <Icon
          title="Bookshelf"
          imgSrc="/images/misc/bookshelf.svg"
          altText="Bookshelf icon"
        />
      </div>
    </div>
     {bookshelfVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="text-white relative w-full max-w-2xl max-h-[80%] grain-wrap rounded-sm overflow-y-scroll bookshelf-wood-bg">
            <button
              type="button"
              onClick={() => setBookshelfVisible(false)}
              className="absolute top-3 right-3 border border-gray-400 rounded-sm px-2 py-1 text-sm bg-white/80"
            >
              X
            </button>

            <h1 className="font-semibold my-5 text-center">Select a book to browse:</h1>
            <div className="flex-1 flex flex-wrap justify-center gap-5 items-center">              
              {Object.keys(AllBooks).map((book) => (
                <div
                  key={book}
                  className="cursor-pointer"
                  onClick={() => handleBookChange(book)}
                >
                  <Page className="book-cover-overlay text-yellow-400">
                    <div className="border h-[70px] w-[40px] flex flex-col items-center justify-center p-8">
                      <h1 className="text-center text-xs font-bold mb-4 font-uncial">
                        {book}
                      </h1>
                    </div>
                  </Page>

                  <span className="font-bold font-uncial">{book}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}