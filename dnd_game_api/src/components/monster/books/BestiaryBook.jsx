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
    let counter = 0;
    let previousMonsterType = "";

    for (let item of monsters) {
      if (
        counter >= maxItemsPerPage ||
        (previousMonsterType && previousMonsterType !== item.type)
      ) {
        allPages.push(currentPageItems);
        currentPageItems = [];
        counter = 0;
      }

      currentPageItems.push(item);
      counter++;
      previousMonsterType = item.type;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  let pageCount = -1;

  return (
    <BookFrame
      setCurrentPage={setCurrentPage}
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