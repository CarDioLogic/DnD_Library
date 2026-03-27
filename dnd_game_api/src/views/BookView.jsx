import { AllBooks } from "./AllBooks";

export default function MonstersBookView({ currentBook }) {
  const BookComponent = AllBooks[currentBook];

  return (
    <div className="wood-bg flex flex-col items-center justify-center bg-gray-400">
      {BookComponent ? <BookComponent /> : <p>Book not found</p>}
    </div>
  );
}