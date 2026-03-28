import { useEffect, useMemo, useState } from "react";
import BookFrame from "../../flipbook/BookFrame";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import Icon from "../../general/Icon";
import Loading from "../../general/Loading";
import { fetchAilments } from "../../../../apiClient/ailmentsApi";
import AilmentsGeneralDetailsPage from "./AilmentsGeneralDetailsPage";


export default function GrimoireBook() {
  const [ailments, setAilments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingAilments, setLoadingAilments] = useState(false);

  const pagesPerAilment = 1;

  useEffect(() => {
    async function loadAilments() {
      setLoadingAilments(true);

      try {
        const data = await fetchAilments();
        const ailments = [
          ...data.conditions.map(cond => ({
            ...cond,
            type: "condition"
          })),
          ...data.damageTypes.map(cond => ({
            ...cond,
            type: "damageType"
          }))
        ];

        setAilments(ailments);

      } catch (error) {
        console.error("Failed to load ailments:", error);
      } finally {
        setLoadingAilments(false);
      }
    }

    loadAilments();
  }, []);

  function paginateAilments(ailmentsList, maxItemsPerPage = 10) {
    const allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousType = "";

    for (const item of ailmentsList) {
      if (
        resetCounter >= maxItemsPerPage ||
        (previousType && previousType !== item.type)
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        resetCounter = 0;
      }

      currentPageItems.push({
        ...item,
        itemNbr,
      });

      itemNbr += pagesPerAilment;
      resetCounter++;
      previousType = item.type;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const ailmentsIndexPages = useMemo(() => {
    return paginateAilments(ailments, 10);
  }, [ailments]);

  const shouldAddExtraPageAfterIndex = ailmentsIndexPages.length % 2 == 0;

  const shouldAddExtraPageAtEnd = true;

  const flipToPageHandler = (itemNbr) => {
    const numberOfIndexPages = ailmentsIndexPages.length;

    const ailmentPage =
      itemNbr +
      numberOfIndexPages +
      3 +
      (shouldAddExtraPageAfterIndex ? 1 : 0);

    setFlipToPage(ailmentPage);
  };

  if (loadingAilments) {
    return <Loading />;
  }

  const ailmentStartOffset =
    ailmentsIndexPages.length + (shouldAddExtraPageAfterIndex ? 5 : 4);

  const bookPages = [];

  bookPages.push(
    <BookFrontCover
      key="front-cover"
      currentPage={currentPage}
      title="Ailments Compedium"
    />
  );

  bookPages.push(
    <Page key="page-1" currentPage={currentPage} pageNumber={1}>
      <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8" />
    </Page>
  );

  bookPages.push(
    <Page key="page-2" currentPage={currentPage} pageNumber={2}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">
          Welcome to the Ailments compedium!
        </h1>
      </div>
    </Page>
  );

  bookPages.push(
    <Page key="page-3" currentPage={currentPage} pageNumber={3}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">Introduction</h1>
        <p className="text">
          This compendium provides a comprehensive overview of known ailments and conditions. Refer to the index to explore their characteristics, impacts, and documented treatments.
        </p>
      </div>
    </Page>
  );

  ailmentsIndexPages.forEach((pageAilments, index) => {
    bookPages.push(
      <IndexPage
        key={`index-page-${index}`}
        flipToPageHandler={flipToPageHandler}
        currentPage={currentPage}
        pageNumber={index + 4}
        items={pageAilments}
        itemCategoryName={pageAilments[0].type || "Unknown"}
        pagesPerItem={pagesPerAilment}
      />
    );
  });

  if (shouldAddExtraPageAfterIndex) {
    bookPages.push(
      <Page key="extra-after-index" currentPage={currentPage}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8" />
      </Page>
    );
  }

  ailments.forEach((ailment, index) => {
    const basePageNumber = ailmentStartOffset + pagesPerAilment * index;
    bookPages.push(
      <AilmentsGeneralDetailsPage
        ailmentType={ailment.type}
        key={`ailment-general-${ailment.index}`}
        ailmentIndex={ailment.index}
        currentPage={currentPage}
        pageNumber={basePageNumber}
      />
    );

  });

  if (shouldAddExtraPageAtEnd) {
    bookPages.push(
      <Page key="extra-at-end" currentPage={currentPage}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8" />
      </Page>
    );
  }

  bookPages.push(
    <Page key="thank-you-page" currentPage={currentPage}>
      <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
        <p className="page-text-lg text-center">
          Thank you for exploring the Compedium! We hope you found the
          information about various ailments insightful and engaging.
        </p>
      </div>
    </Page>
  );

  bookPages.push(
    <BookBackCover key="back-cover" currentPage={currentPage} />
  );

  return (
    <BookFrame
      fillParentWidth={false}
      key={`book-${ailmentsIndexPages.length}-${ailments.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      {bookPages}
    </BookFrame>
  );
}