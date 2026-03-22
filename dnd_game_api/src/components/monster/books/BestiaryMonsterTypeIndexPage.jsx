import Page from "../../flipbook/Page";

export default function BestiaryMonsterTypeIndexPage({
  monsters,
  monsterType,
  pageNumber,
  currentPage
}) {
  return (
    <Page 
    currentPage={currentPage}
    pageNumber={pageNumber}>
      <div>
        <h2 className="font">{monsterType}'s:</h2>
        <ul>
          {monsters.map((monster) => (
            <li key={monster.index}>
              {monster.index}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}