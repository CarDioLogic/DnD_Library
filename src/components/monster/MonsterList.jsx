import { useEffect, useState } from 'react';
import { fetchMonstersByType } from '../../../apiClient/monsterApi';
import { CREATURE_TO_HABITATS } from '../../../Data/HabitatMonsterMapping';

export default function MonsterList({ monsterType }) {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        console.log("FETCHING MONSTERS OF TYPE:", CREATURE_TO_HABITATS);
        fetchMonstersByType(monsterType).then((data) => {
          console.log(data);
            setMonsters(data);
        }).catch((error) => {
            //check api availabitlity component
            console.error("Error fetching monsters:", error);
        });
    }, [monsterType]);

  return (
    <div>
      <h2>Monster List</h2>
      <ul>
        {monsters.map((monster, index) => (
          <li key={index}>
            {/* {monster.name} - {monster.type} - {monster.index} */}
            {monster.index}
          </li>
        ))}
      </ul>
    </div>
  )
}
