import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryMonsterTypeIndexPage = forwardRef(
  (
    { monsters, monsterType, pageNumber, currentPage, flipToPageHandler, pagesPerMonster },
    ref
  ) => {
    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
      >
        <div>
          <h1 className="underline text-center mb-4">Index:</h1>
          <h2 className="font-bold italic">{monsterType}'s:</h2>

          <ul className="ml-4 mt-2 space-y-1">
            {monsters.map((monster) => (
              <li title={monster.monsterNbr}
                className="cursor-pointer text-sm"
                key={monster.index}
                onClick={(e) => {
                  e.stopPropagation();
                  flipToPageHandler(monster.monsterNbr);
                }}
              >
                {`${(Math.round(monster.monsterNbr / pagesPerMonster))}. ${monster.name}`}
              </li>
            ))}
          </ul>
        </div>
      </Page>
    );
  }
);

BestiaryMonsterTypeIndexPage.displayName = "BestiaryMonsterTypeIndexPage";

export default BestiaryMonsterTypeIndexPage;