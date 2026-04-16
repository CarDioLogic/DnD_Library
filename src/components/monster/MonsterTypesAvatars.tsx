import AvatarCard from 'src/components/general/AvatarCard'
import { MONSTER_TYPES } from 'data/MonsterTypes'

export default function MonsterTypesAvatars({ selectedType, onSelectType }) {
  return (    
    <div className="flex flex-wrap gap-4">
      {MONSTER_TYPES.map((type) => (
        <AvatarCard
          key={type}
          title={type}
          imageSrc={`/images/monsterTypes/${type}.svg`}
          isSelected={type === selectedType}
          onClick={() => onSelectType(type)}
        />
      ))}
    </div>
  )
}
