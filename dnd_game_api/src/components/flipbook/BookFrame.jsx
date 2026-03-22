import { useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function BookFrame({ children, setCurrentPage }) {
  const book = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!book.current) return;

      if (event.key === 'ArrowLeft') {
        book.current.pageFlip().flipPrev();
      }

      if (event.key === 'ArrowRight') {
        book.current.pageFlip().flipNext();
      }
    };


    document.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const onFlip = useCallback((e) => {
        let currentPage = e.data + 1; //offset correctly current page
        console.log("current page", currentPage);
        setCurrentPage(e.data);
    }, [setCurrentPage]);

  return (
    <HTMLFlipBook 
        onFlip={onFlip}
        ref={book} width={300} height={500}>
      {children}
    </HTMLFlipBook>
  );
}