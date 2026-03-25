import { useEffect, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { playPageFlip2 } from '../../../Core/soundplayer';
import InstructionKey from '../general/InstructionKey';

export default function BookFrame({ children, 
  setCurrentPage, 
  flipToPage,
  width = 300,
  height = 500,
  isHidden = false,
  fillParentWidth = false
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
    book.current.pageFlip().turnToPage(flipToPage);
  }, [flipToPage]);

  const onFlip = useCallback(
    (e) => {
      const currentPage = e.data; 
      console.log("Current page:", currentPage);
      setCurrentPage(currentPage);
      playPageFlip2();
    },
    [setCurrentPage]
  );

  if(isHidden) return null;

  return (
    <>
      <HTMLFlipBook
        className="relative"
        // clickEventForward={false}
        disableFlipByClick={true}
          showCover={true}
          onFlip={onFlip}
          ref={book}
          width={width}
          height={height}
          size={fillParentWidth ? 'stretch' :"fixed"}
        >
          {children}
        </HTMLFlipBook>
        <div className="mt-5 flex gap-10 items-start text-center">
          <InstructionKey
            keyBind="1"
            label="Beginning"
          />
          <InstructionKey
            isArrow={true}
            keyBind="ArrowLeft"
            label="Previous page"
          />
          <InstructionKey
            isArrow={true}
            keyBind="ArrowRight"
            label="Next page"
          />
          <InstructionKey
            keyBind="0"
            label="End"
          />
        </div>
    </>
  );
}