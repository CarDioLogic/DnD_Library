import { useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function BookFrame({ children }) {
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

  return (
    <HTMLFlipBook ref={book} width={300} height={500}>
      {children}
    </HTMLFlipBook>
  );
}