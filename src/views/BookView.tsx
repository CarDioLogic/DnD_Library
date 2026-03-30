import { AllBooks } from "../components/books/AllBooks";

export default function MonstersBookView({ currentBook }) {
  const BookComponent = AllBooks[currentBook];

  return (
    <div className="wood-bg flex flex-col items-center justify-center bg-gray-400 landscape-only">
      {BookComponent ? <BookComponent /> : <p>Book not found</p>}
    </div>
  );
}