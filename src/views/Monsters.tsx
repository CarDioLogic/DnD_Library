import MonsterTypesAvatars from "../components/monster/MonsterTypesAvatars"
import MonsterList from "../components/monster/MonsterList"
import { MONSTER_TYPES } from "../../Data/MonsterTypes";
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
