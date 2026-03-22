import Page from "../../flipbook/Page";

export default function BestiaryMonsterTypeIndexPage({
  monsters,
  monsterType,
  pageNumber,
  currentPage,
  flipToPageHandler
}) {
  return (
    <Page 
    currentPage={currentPage}
    pageNumber={pageNumber}>
      <div>
        <h2 className="font">{monsterType}'s:</h2>
        <ul>
          {monsters.map((monster) => (
            <li className="cursor-pointer" key={monster.index} 
                onClick={(e) => {
                    e.stopPropagation();
                    flipToPageHandler(monster.monsterNbr)
                }}>
              {monster.index}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}