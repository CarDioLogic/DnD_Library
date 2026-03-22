import BookFrame from "../../flipbook/BookFrame";
import { useEffect, useState } from "react";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterTypeIndexPage from "./BestiaryMonsterTypeIndexPage";
import BestiaryMonsterDetailsPage from "./BestiaryMonsterDetailsPage";

export default function BestiaryBook() {
  const [monsters, setMonsters] = useState([]);
  const [monstersIndexPages, setMonstersIndexPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);

  useEffect(() => {
    async function loadMonsters() {
      let allMonsters = [];

      for (let mt of MONSTER_TYPES) {
        const data = await fetchMonstersByType(mt);
        allMonsters.push(...data);
      }

      setMonsters(allMonsters);
    }

    loadMonsters();
  }, []);

  useEffect(() => {
    const pages = paginateMonsters(monsters, 10);
    setMonstersIndexPages(pages);
  }, [monsters]);

  function paginateMonsters(monsters, maxItemsPerPage = 10) {
    let allPages = [];
    let currentPageItems = [];
    let resetCounter = 0;
    let monsterNbr = 0;
    let previousMonsterType = "";

    for (let item of monsters) {
      monsterNbr++;
      if (
        resetCounter >= maxItemsPerPage ||
        (previousMonsterType && previousMonsterType !== item.type)
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        resetCounter = 0;
      }

      currentPageItems.push({...item,
        monsterNbr
      });
      resetCounter++;
      previousMonsterType = item.type;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const flipToPageHandler = (monsterIndex) => {
    const nbrIndexPages = monstersIndexPages.length;
    const monsterPage = monsterIndex + nbrIndexPages - 3; //offset because clicking on index also triggers a onclick page flip
    setFlipToPage(monsterPage);
  };

  let pageCount = -1;

  return (
    <BookFrame
      setCurrentPage={setCurrentPage}
      flipToPage={flipToPage}
    >
      {monstersIndexPages.map((pageMonsters) => {
        pageCount += 1;

        return (
          <div
            key={`index-page-${pageCount}`}
            className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200"
          >
            <h1 className="underline">Index:</h1>
            <BestiaryMonsterTypeIndexPage
              flipToPageHandler={flipToPageHandler}
              currentPage={currentPage}
              pageNumber={pageCount}
              monsters={pageMonsters}
              monsterType={pageMonsters[0]?.type || "Unknown"}
            />
          </div>
        );
      })}

      {monsters.map((monster) => {
        pageCount += 1;

        return (
          <div
            key={`monster-page-${monster.index}`}
            className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200"
          >
            <BestiaryMonsterDetailsPage
              monsterIndex={monster.index}
              currentPage={currentPage}
              pageNumber={pageCount}
            />
          </div>
        );
      })}
    </BookFrame>
  );
}