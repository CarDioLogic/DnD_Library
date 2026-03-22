import Page from "../../flipbook/Page";

export default function BestiaryMonsterTypeIndexPage({
  monsters,
  monsterType,
  number,
}) {
  return (
    <Page number={number}>
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