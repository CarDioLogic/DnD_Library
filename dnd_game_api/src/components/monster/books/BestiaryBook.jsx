import BookFrame from "../../flipbook/BookFrame"
import { useEffect, useState } from "react";
import { MONSTER_TYPES } from '../../../../Data/MonsterTypes'
import { fetchMonstersByType } from "../../../../apiClient/monsterApi";
import BestiaryMonsterIndex from './BestiaryMonsterIndex';
import BestiaryMonsterTypeIndexPage from "./BestiaryMonsterTypeIndexPage";

// import BookPage from "../../flipbook/BookPage"
export default function BestiaryBook() {
    const [monsters, setMonsters] = useState([]);
    const [monstersIndexPages, setMonstersIndexPages] = useState([]);

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
        console.log("MONSTERS IN INDEX:", pages);
    }, [monsters]);

    function paginateMonsters(monsters, maxItemsPerPage = 10) {
      let allPages = [];
      let currentPageItems = [];
      let counter = 0;
      let previousMonsterType = "";

      for (let item of monsters) {
        if (counter >= maxItemsPerPage || (previousMonsterType && previousMonsterType != item.type)) {
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

  return (
    <BookFrame>
      {/* index of monsters */}
      {/* careful if thinking of refactoring page div to its own component. flipping page package and react try to interact both with DOM causing errors */}

        {monstersIndexPages.map((monsters, index) => (
            <div className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200">
              <h1 className="underline">Index:</h1>
                <BestiaryMonsterTypeIndexPage
                    key={monsters[0]?.index + index}
                    monsters={monsters}
                    monsterType={monsters[0]?.type || "Unknown"}
                />
            </div>
        ))}
        {monsters.map((monster, index) => (
          <div className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200">
             {/* should make api request to get more details */}
            <h1>Monster details page</h1>
            <h2>{monster.name}</h2>
          </div>
        ))}
    </BookFrame>
  )
}
