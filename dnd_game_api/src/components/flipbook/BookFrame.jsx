import { useEffect, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { playPageFlip } from '../../../Core/soundplayer';

export default function BookFrame({ children, 
  setCurrentPage, 
  flipToPage,
  width = 300,
  height = 500,
  isHidden = false,
 }) {
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

      if (event.key === '1') {
        book.current.pageFlip().flip(0);
      }

      if (event.key === '0') {
        const pageFlip = book.current.pageFlip();
        const lastPageIndex = pageFlip.getPageCount() - 1;

        pageFlip.flip(lastPageIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!book.current || flipToPage == null) return;
    if(flipToPage <= 0 || flipToPage >= book.current.pageFlip().getPageCount()) {
        console.warn("flipToPage is out of bounds: ", flipToPage);
        return;
    }

    console.log("Flipping to page ", flipToPage);
    book.current.pageFlip().flip(flipToPage);
    console.log("flip to ", flipToPage )

    // or:
    // book.current.pageFlip().turnToPage(flipToPage);
  }, [flipToPage]);

  const onFlip = useCallback(
    (e) => {
      const currentPage = e.data; // 0-based
      console.log('current page', currentPage);
      setCurrentPage(currentPage);
      playPageFlip('page-flip.mp3');
    },
    [setCurrentPage]
  );

  console.log("BookFrame render: isHidden=", isHidden);
  if(isHidden) return null;

  return (
    <HTMLFlipBook
      showCover={true}
      onFlip={onFlip}
      ref={book}
      width={width}
      height={height}
    >
      {children}
    </HTMLFlipBook>
  );
}