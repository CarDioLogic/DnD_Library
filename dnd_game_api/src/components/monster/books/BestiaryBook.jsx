import BookFrame from "../../flipbook/BookFrame";
import { useEffect, useMemo, useState } from "react";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterTypeIndexPage from "./BestiaryMonsterTypeIndexPage";
import BestiaryMonsterGeneralDetailsPage from "./BestiaryMonsterGeneralDetailsPage";
import BestiaryMonsterSpecialActionsPage from "./BestiaryMonsterSpecialActionsPage";
import BestiaryMonsterActionsPage from "./BestiaryMonsterActionsPage";
import BestiaryBookFrontCover from "./BestiaryBookFrontCover";
import BestiaryBookBackCover from "./BestiaryBookBackCover";
import Page from "../../flipbook/Page";

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
    let monsterNbr = 1;
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
        monsterNbr: monsterNbr,
      });
      monsterNbr += pagesPerMonster;

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

  const flipToPageHandler = (monsterIndex) => {
    const nbrIndexPages = monstersIndexPages.length;

    //each monster has 2 pages
    const monsterPage = (monsterIndex + 1) + nbrIndexPages - 1; //extra page for the cover
    console.log("Flipping to page:", monsterPage);
    setFlipToPage(monsterPage);
  };

  if (loadingMonsters) {
    return <div>Loading bestiary...</div>;
  }

  return (
    <BookFrame
      key={`book-${monstersIndexPages.length}-${monsters.length}`}
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
    >
      <BestiaryBookFrontCover currentPage={currentPage} />
      <Page currentPage={currentPage}>
        <div className="border text-center h-full w-full flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Bestiary!</h1>
          <p className="text">
            This tome contains detailed information about various monsters. Use the index to find specific creatures and learn about their traits, abilities, and lore.
          </p>
        </div>
      </Page>

      {monstersIndexPages.map((pageMonsters, index) => (
        <BestiaryMonsterTypeIndexPage
          key={`index-page-${index}`}
          flipToPageHandler={flipToPageHandler}
          currentPage={currentPage}
          pageNumber={index + 2}
          monsters={pageMonsters}
          monsterType={pageMonsters[0]?.type || "Unknown"}
          pagesPerMonster={pagesPerMonster}
        />
      ))}

      {monsters.flatMap((monster, index) => [
        <BestiaryMonsterGeneralDetailsPage
          key={`monster-general-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 2 + pagesPerMonster * index}
        />,
        <BestiaryMonsterActionsPage
          key={`monster-actions-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 3 + pagesPerMonster * index}
        />,
        <BestiaryMonsterSpecialActionsPage
          key={`monster-special-actions-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 4 + pagesPerMonster * index}
        />,
        <Page 
          key={`monster-placeholder-page-${monster.index}`}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 6 + pagesPerMonster * index}>
          <div className="text-center h-full w-full flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-bold mb-4">Placeholder page</h1>
          </div>
        </Page>
      ])}

      <BestiaryBookBackCover currentPage={currentPage} />
    </BookFrame>
  );
}