import BookFrame from "../../flipbook/BookFrame";
import { useEffect, useMemo, useState } from "react";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterGeneralDetailsPage from "./BestiaryMonsterGeneralDetailsPage";
import BestiaryMonsterSpecialActionsPage from "./BestiaryMonsterSpecialActionsPage";
import BestiaryMonsterActionsPage from "./BestiaryMonsterActionsPage";
import BestiaryMonsterSensesProficienciesResistancesPage  from "./BestiaryMonsterSensesProficienciesResistancesPage";
import BookFrontCover from "../../flipbook/BookFrontCover";
import BookBackCover from "../../flipbook/BookBackCover";
import IndexPage from "../../flipbook/IndexPage";
import Page from "../../flipbook/Page";
import Loading from "../../general/Loading";

export default function BestiaryBook() {
  const [monsters, setMonsters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingMonsters, setLoadingMonsters] = useState(false);
  const pagesPerMonster = 4; //general details + actions

  useEffect(() => {
    async function loadMonsters() {
      let allMonsters = [];
      setLoadingMonsters(true);

      try {
        for (const mt of MONSTER_TYPES) {
          const data = await fetchMonstersByType(mt);
          allMonsters.push(...data);
        }

        setMonsters(allMonsters);
      } catch (error) {
        console.error("Failed to load monsters:", error);
      } finally {
        setLoadingMonsters(false);
      }
    }

    loadMonsters();
  }, []);

  function paginateMonsters(monsters, maxItemsPerPage = 10) {
    let allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let itemNbr = 1;
    let previousMonsterType = "";

    for (let item of monsters) {
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
        itemNbr: itemNbr,
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
    return paginateMonsters(monsters, 13);
  }, [monsters]);

  const addExtraPageAtEnd = () => {
        //will use this to decide wether to add an extra empty page at the end so that the cover stays in the right position
      const lastPageAfterMonsters =
        monsters[monsters.length - 1].itemNbr +  monstersIndexPages.length + 3;  
      return lastPageAfterMonsters % 2 != 0;
  };

  const flipToPageHandler = (itemNbr) => {
    const nbrIndexPages = monstersIndexPages.length;

    //each monster
    const monsterPage = (itemNbr) + nbrIndexPages + 3; //extra pages
    console.log("Flipping to page:", monsterPage);
    console.log("CurrentPage after flip:", currentPage);
    setFlipToPage(monsterPage);
  };

  if (loadingMonsters) {
    return <Loading/>;
  }

  return (
    <BookFrame
      fillParentWidth={false}
      key={`book-${monstersIndexPages.length}-${monsters.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
      width="400"
    >
      <BookFrontCover currentPage={currentPage} title="Bestiary"/>

      <Page currentPage={currentPage}
      pageNumber={1}>
        <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
        </div>
      </Page>
      <Page currentPage={currentPage}
        pageNumber={2}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Bestiary!</h1>
        </div>
      </Page>
      <Page currentPage={currentPage}
        pageNumber={3}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">Introduction</h1>
          <p className="text">
            This tome contains detailed information about various monsters. Use the index to find specific creatures and learn about their traits, abilities, and lore.
          </p>
        </div>
      </Page>

      {monstersIndexPages.map((pageMonsters, index) => (
        <IndexPage
          key={`index-page-${index}`}
          flipToPageHandler={flipToPageHandler}
          currentPage={currentPage}
          pageNumber={index + 4}
          items={pageMonsters}
          itemCategoryName={pageMonsters[0]?.type || "Unknown"}
          pagesPerItem={pagesPerMonster}
        />
      ))}

      {monsters.flatMap((monster, index) => [
        <BestiaryMonsterGeneralDetailsPage
          key={`monster-general-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 4 + pagesPerMonster * index}
        />,
        <BestiaryMonsterActionsPage
          key={`monster-actions-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 5 + pagesPerMonster * index}
        />,
        <BestiaryMonsterSpecialActionsPage
          key={`monster-special-actions-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 6 + pagesPerMonster * index}
        />,
        <BestiaryMonsterSensesProficienciesResistancesPage
          key={`monster-sensprofsres-actions-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 7 + pagesPerMonster * index}
        />,
      ])}

      { addExtraPageAtEnd && (
        <Page currentPage={currentPage}>
          <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          </div>
        </Page>
      )}

      <Page currentPage={currentPage}>
        <div className="border outline outline-offset-15 outline-2 outline-dashed outline-gray-500 text-center h-full w-full flex flex-col items-center justify-center p-8">
          <p className="text-lg text-center">
            Thank you for exploring the Bestiary! We hope you found the information about various monsters insightful and engaging.
          </p>
        </div>
      </Page>
      <BookBackCover currentPage={currentPage} />
    </BookFrame>
  );
}