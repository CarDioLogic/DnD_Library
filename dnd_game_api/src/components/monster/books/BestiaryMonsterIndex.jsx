// BestiaryMonsterIndex.tsx
import { useEffect, useState } from "react";
import { MONSTER_TYPES } from "../../../../Data/MonsterTypes";
import BestiaryMonsterTypeIndexPage from "./BestiaryMonsterTypeIndexPage";

export default function BestiaryMonsterIndex({monsters}) {


  //should receive list of monsters ordered by type to function properly


    return (
    <>
        {monstersIndexPages.map((monsters, index) => (
            <div className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200">
                <BestiaryMonsterTypeIndexPage
                    key={monsters[0]?.index + index}
                    monsters={monsters}
                    monsterType={monsters[0]?.type || "Unknown"}
                />
            </div>
        ))}
    </>
    );
}
