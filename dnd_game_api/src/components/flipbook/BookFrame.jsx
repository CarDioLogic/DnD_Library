import { useEffect, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import SoundPlayer from '../../../Core/soundPlayer';
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
  const soundPlayer = new SoundPlayer();

  const flipToPreviousPage = () => { 
    if (!book.current) return;
    book.current.pageFlip().flipPrev();
  }
  const flipToNextPage = () => { 
    if (!book.current) return;
    book.current.pageFlip().flipNext();
  }
  const flipToFirstPage = () => { 
    if (!book.current) return;
    book.current.pageFlip().flip(0);
  }
  const flipToLastPage = () => { 
    if (!book.current) return;
    const pageFlip = book.current.pageFlip();
    const lastPageIndex = pageFlip.getPageCount() - 1;

    pageFlip.flip(lastPageIndex);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!book.current) return;

      if (event.key === 'ArrowLeft') {
        flipToPreviousPage();
      }

      if (event.key === 'ArrowRight') {
        flipToNextPage();
      }

      if (event.key === '1') {
        flipToFirstPage();
      }

      if (event.key === '0') {
        flipToLastPage();
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
      soundPlayer.playPageFlip2();
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
            onClickFunc={flipToFirstPage}
            keyBind="1"
            label="Beginning"
          />
          <InstructionKey
            onClickFunc={flipToPreviousPage}
            isArrow={true}
            keyBind="ArrowLeft"
            label="Previous page"
          />
          <InstructionKey
            onClickFunc={flipToNextPage}
            isArrow={true}
            keyBind="ArrowRight"
            label="Next page"
          />
          <InstructionKey
            onClickFunc={flipToLastPage}
            keyBind="0"
            label="End"
          />
        </div>
    </>
  );
}