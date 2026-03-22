import BookFrame from "../../flipbook/BookFrame";
import { useEffect, useMemo, useState } from "react";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterTypeIndexPage from "./BestiaryMonsterTypeIndexPage";
import BestiaryMonsterDetailsPage from "./BestiaryMonsterDetailsPage";
import BestiaryBookFrontCover from "./BestiaryBookFrontCover";
import BestiaryBookBackCover from "./BestiaryBookBackCover";
import Page from "../../flipbook/Page";

export default function BestiaryBook() {
  const [monsters, setMonsters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [flipToPage, setFlipToPage] = useState(0);
  const [loadingMonsters, setLoadingMonsters] = useState(false);

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

      currentPageItems.push({
        ...item,
        monsterNbr,
      });

      resetCounter++;
      previousMonsterType = item.type;
    }

    if (currentPageItems.length > 0) {
      allPages.push(currentPageItems);
    }

    return allPages;
  }

  const monstersIndexPages = useMemo(() => {
    return paginateMonsters(monsters, 10);
  }, [monsters]);

  const flipToPageHandler = (monsterIndex) => {
    const nbrIndexPages = monstersIndexPages.length;
    const monsterPage = monsterIndex + nbrIndexPages - 2; //extra page for the cover
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

      {monstersIndexPages.map((pageMonsters, index) => (
        <BestiaryMonsterTypeIndexPage
          key={`index-page-${index}`}
          flipToPageHandler={flipToPageHandler}
          currentPage={currentPage}
          pageNumber={index + 1}
          monsters={pageMonsters}
          monsterType={pageMonsters[0]?.type || "Unknown"}
        />
      ))}

      {monsters.map((monster, index) => (
        <BestiaryMonsterDetailsPage
          key={`monster-page-${monster.index}`}
          monsterIndex={monster.index}
          currentPage={currentPage}
          pageNumber={monstersIndexPages.length + 1 + index}
        />
      ))}

      <BestiaryBookBackCover currentPage={currentPage} />
    </BookFrame>
  );
}