
import { useEffect, useState } from 'react';

export default function BestiaryMonsterTypeIndexPage({monsters, monsterType}) {


    console.log("Page:", monsters);
    
    return (
    <div>
      <h2 className="font">{monsterType}'s:</h2>
      <ul>
        {monsters.map(monster => (
          <li key={monster.index}>
            {/* {monster.name} - {monster.type} - {monster.index} */}
            {monster.index}
          </li>
        ))}
      </ul>
    </div>
  )
}
