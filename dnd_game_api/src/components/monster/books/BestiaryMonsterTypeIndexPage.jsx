import { forwardRef } from "react";
import Page from "../../flipbook/Page";

const BestiaryMonsterTypeIndexPage = forwardRef(
  (
    { monsters, monsterType, pageNumber, currentPage, flipToPageHandler },
    ref
  ) => {
    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
      >
        <div>
          <h1 className="underline">Index:</h1>
          <h2 className="font">{monsterType}'s:</h2>

          <ul>
            {monsters.map((monster) => (
              <li
                className="cursor-pointer"
                key={monster.index}
                onClick={(e) => {
                  e.stopPropagation();
                  flipToPageHandler(monster.monsterNbr);
                }}
              >
                {monster.index}
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