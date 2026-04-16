import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import SoundPlayer from 'core/soundPlayer';
import InstructionKey from 'src/components/general/InstructionKey';

export default function BookFrame({
  children,
  setCurrentPage,
  flipToPage,
  width = 300,
  height = 500,
  isHidden = false,
  fillParentWidth = false,
}) {
  const book = useRef(null);
  const soundPlayer = useMemo(() => new SoundPlayer(), []);
  const [decreaseBookSize, setDecreaseBookSize] = useState(window.innerWidth < 800 || (window.innerHeight < 450 && window.matchMedia("(orientation: landscape)")));

  const flipToPreviousPage = () => {
    const pageFlip = book.current?.pageFlip?.();
    if (!pageFlip) return;
    pageFlip.flipPrev();
  };

  const flipToNextPage = () => {
    const pageFlip = book.current?.pageFlip?.();
    if (!pageFlip) return;
    pageFlip.flipNext();
  };

  const flipToFirstPage = () => {
    const pageFlip = book.current?.pageFlip?.();
    if (!pageFlip) return;
    pageFlip.flip(0);
  };

  const flipToLastPage = () => {
    const pageFlip = book.current?.pageFlip?.();
    if (!pageFlip) return;
    const lastPageIndex = pageFlip.getPageCount() - 1;
    pageFlip.flip(lastPageIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setDecreaseBookSize(window.innerWidth < 800 || (window.innerHeight < 450 && window.matchMedia("(orientation: landscape)")));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
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
    if (flipToPage == null) return;

    const pageFlip = book.current?.pageFlip?.();
    if (!pageFlip) return;

    const pageCount = pageFlip.getPageCount();

    if (flipToPage < 0 || flipToPage >= pageCount) {
      console.warn('flipToPage is out of bounds:', flipToPage);
      return;
    }

    pageFlip.turnToPage(flipToPage);
  }, [flipToPage]);

  const onFlip = useCallback(
    (e) => {
      const currentPage = e.data;
      setCurrentPage(currentPage);
      soundPlayer.playPageFlip2();
    },
    [setCurrentPage, soundPlayer]
  );

  if (isHidden) return null;

  const bookWidth = decreaseBookSize ? Math.round(width * 0.75) : width;
  const bookHeight = decreaseBookSize ? Math.round(height * 0.75) : height;

  return (
    <>
      <HTMLFlipBook
        key={decreaseBookSize ? 'small' : 'large'}
        className="relative"
        disableFlipByClick={true}
        showCover={true}
        onFlip={onFlip}
        ref={book}
        usePortrait={true}
        width={bookWidth}
        height={bookHeight}
        size={fillParentWidth ? 'stretch' : 'fixed'}
        mobileScrollSupport={true}
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