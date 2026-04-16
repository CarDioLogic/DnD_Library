import MonsterTypesAvatars from "src/components/monster/MonsterTypesAvatars"
import MonsterList from "src/components/monster/MonsterList"
import { MONSTER_TYPES } from "data/MonsterTypes";
import { useState } from "react"

export default function Monsters() {
    const [selectedMonsterType, setSelectedMonsterType] = useState(MONSTER_TYPES[0]);

  return (
    <div className="">
      <h1>Monsters</h1>
      <MonsterTypesAvatars selectedType={selectedMonsterType} onSelectType={setSelectedMonsterType} />
      <MonsterList monsterType={selectedMonsterType} />
    </div>
  )
}
