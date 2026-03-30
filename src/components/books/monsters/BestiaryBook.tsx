import { useEffect, useMemo, useState } from "react";
import BookFrame from "../../flipbook/BookFrame";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterGeneralDetailsPage from "./BestiaryMonsterGeneralDetailsPage";
import BestiaryMonsterSpecialActionsPage from "./BestiaryMonsterSpecialActionsPage";
import BestiaryMonsterActionsPage from "./BestiaryMonsterActionsPage";
import BestiaryMonsterSensesProficienciesResistancesPage from "./BestiaryMonsterSensesProficienciesResistancesPage";
import Loading from "../../general/Loading";

export default function BestiaryBook() {
  const [monsters, setMonsters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingMonsters, setLoadingMonsters] = useState(false);

  const pagesPerMonster = 4;

  useEffect(() => {
    async function loadMonsters() {
      setLoadingMonsters(true);

      try {
        const results = [];

        for (const mt of MONSTER_TYPES) {
          const data = await fetchMonstersByType(mt);
          results.push(...data);
        }

        setMonsters(results);
      } catch (error) {
        console.error("Failed to load monsters:", error);
      } finally {
        setLoadingMonsters(false);
      }
    }

    loadMonsters();
  }, []);

  function paginateMonsters(monstersList, maxItemsPerPage = 10) {
    const allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousMonsterType = "";

    for (const item of monstersList) {
      if (
        resetCounter >= maxItemsPerPage ||
        (previousMonsterType && previousMonsterType !== item.type)
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        resetCounter = 0;
      }

      currentPageItems.push({
        ...item,
        itemNbr,
      });

      itemNbr += pagesPerMonster;
      resetCounter++;
      previousMonsterType = item.type;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const monstersIndexPages = useMemo(() => {
    return paginateMonsters(monsters, 12);
  }, [monsters]);

  const shouldAddExtraPageAfterIndex = monstersIndexPages.length % 2 == 0;

  const shouldAddExtraPageAtEnd = true;

  const flipToPageHandler = (itemNbr) => {
    const numberOfIndexPages = monstersIndexPages.length;

    const monsterPage =
      itemNbr +
      numberOfIndexPages +
      3 +
      (shouldAddExtraPageAfterIndex ? 1 : 0);

    setFlipToPage(monsterPage);
  };

  if (loadingMonsters) {
    return <Loading />;
  }

  const monsterStartOffset =
    monstersIndexPages.length + (shouldAddExtraPageAfterIndex ? 5 : 4);

  const bookPages = [];

  bookPages.push(
    <BookFrontCover
      key="front-cover"
      currentPage={currentPage}
      title="Bestiary"
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
          Welcome to the Bestiary!
        </h1>
      </div>
    </Page>
  );

  bookPages.push(
    <Page key="page-3" currentPage={currentPage} pageNumber={3}>
      <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
        <h1 className="page-text-2xl font-bold mb-4">Introduction</h1>
        <p className="text">
          This tome contains detailed information about various monsters. Use
          the index to find specific creatures and learn about their traits,
          abilities, and lore.
        </p>
      </div>
    </Page>
  );

  monstersIndexPages.forEach((pageMonsters, index) => {
    bookPages.push(
      <IndexPage
        key={`index-page-${index}`}
        flipToPageHandler={flipToPageHandler}
        currentPage={currentPage}
        pageNumber={index + 4}
        items={pageMonsters}
        itemCategoryName={pageMonsters[0]?.type || "Unknown"}
        pagesPerItem={pagesPerMonster}
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

  monsters.forEach((monster, index) => {
    const basePageNumber = monsterStartOffset + pagesPerMonster * index;

    bookPages.push(
      <BestiaryMonsterGeneralDetailsPage
        key={`monster-general-${monster.index}`}
        monsterIndex={monster.index}
        currentPage={currentPage}
        pageNumber={basePageNumber}
      />
    );

    bookPages.push(
      <BestiaryMonsterActionsPage
        key={`monster-actions-${monster.index}`}
        monsterIndex={monster.index}
        currentPage={currentPage}
        pageNumber={basePageNumber + 1}
      />
    );

    bookPages.push(
      <BestiaryMonsterSpecialActionsPage
        key={`monster-special-actions-${monster.index}`}
        monsterIndex={monster.index}
        currentPage={currentPage}
        pageNumber={basePageNumber + 2}
      />
    );

    bookPages.push(
      <BestiaryMonsterSensesProficienciesResistancesPage
        key={`monster-sensprofsres-actions-${monster.index}`}
        monsterIndex={monster.index}
        currentPage={currentPage}
        pageNumber={basePageNumber + 3}
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
          Thank you for exploring the Bestiary! We hope you found the
          information about various monsters insightful and engaging.
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
      key={`book-${monstersIndexPages.length}-${monsters.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      {bookPages}
    </BookFrame>
  );
}