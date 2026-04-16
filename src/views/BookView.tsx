import { AllBooks } from "src/components/books/AllBooks";

export default function MonstersBookView({ currentBook }) {
  const BookComponent = AllBooks[currentBook];

  return (
    <div className="wood-bg flex flex-col items-center justify-center bg-gray-400 landscape-only">
      {BookComponent ? <BookComponent /> : <p>Book not found</p>}
     <a className="text-white mt-2 hover:text-gray-400" href="https://www.dnd5eapi.co/" target="_blank">Powered by D&D 5e API</a>
    </div>
  );
}