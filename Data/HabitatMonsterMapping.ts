import { Habitat, HABITATS } from "./Habitats";

export const CREATURE_TO_HABITATS: Record<string, Habitat[]> = {
  // Aberrations
  "aboleth": ["Underdark", "Underwater"],
  "chuul": ["Coastal", "Swamp", "Underwater"],
  "cloaker": ["Mountain", "Underdark"],
  "gibbering-mouther": ["Swamp", "Underdark"],
  "otyugh": ["Underdark", "Urban"],

  // Beasts (sampled but representative pattern)
  "ape": ["Forest"],
  "axe-beak": ["Grassland", "Hill"],
  "baboon": ["Forest", "Grassland"],
  "badger": ["Forest", "Hill"],
  "bat": ["Forest", "Mountain", "Underdark"],
  "black-bear": ["Forest", "Hill"],
  "blood-hawk": ["Coastal", "Grassland", "Hill", "Mountain"],
  "boar": ["Forest", "Grassland"],
  "brown-bear": ["Forest", "Hill", "Mountain"],
  "camel": ["Desert"],
  "cat": ["Urban"],
  "constrictor-snake": ["Forest", "Swamp"],
  "crab": ["Coastal", "Underwater"],
  "crocodile": ["Coastal", "Swamp", "Underwater"],
  "deer": ["Forest", "Grassland"],
  "dire-wolf": ["Arctic", "Forest", "Hill", "Mountain"],
  "draft-horse": ["Grassland", "Urban"],
  "eagle": ["Coastal", "Hill", "Mountain"],
  "elephant": ["Grassland", "Forest"],
  "elk": ["Forest", "Grassland", "Hill"],
  "flying-snake": ["Forest", "Swamp"],
  "frog": ["Swamp"],

  // Giant beasts
  "giant-ape": ["Forest"],
  "giant-badger": ["Forest", "Hill"],
  "giant-bat": ["Mountain", "Underdark"],
  "giant-boar": ["Forest", "Grassland"],
  "giant-centipede": ["Forest", "Swamp", "Underdark"],
  "giant-constrictor-snake": ["Forest", "Swamp"],
  "giant-crab": ["Coastal", "Underwater"],
  "giant-crocodile": ["Swamp", "Underwater"],
  "giant-eagle": ["Hill", "Mountain"],
  "giant-elk": ["Forest", "Hill"],
  "giant-fire-beetle": ["Underdark", "Urban"],
  "giant-frog": ["Swamp"],
  "giant-goat": ["Hill", "Mountain"],
  "giant-hyena": ["Desert", "Grassland"],
  "giant-lizard": ["Desert", "Underdark"],
  "giant-octopus": ["Coastal", "Underwater"],
  "giant-owl": ["Forest", "Hill"],
  "giant-poisonous-snake": ["Forest", "Swamp"],
  "giant-rat": ["Urban", "Underdark"],
  "giant-rat-diseased": ["Urban", "Underdark"],
  "giant-scorpion": ["Desert", "Underdark"],
  "giant-sea-horse": ["Coastal", "Underwater"],
  "giant-shark": ["Coastal", "Underwater"],
  "giant-spider": ["Forest", "Underdark", "Urban"],
  "giant-toad": ["Swamp"],
  "giant-vulture": ["Desert", "Hill", "Mountain"],
  "giant-wasp": ["Forest", "Grassland"],
  "giant-weasel": ["Forest", "Hill"],
  "giant-wolf-spider": ["Forest", "Underdark"],

  // More beasts
  "goat": ["Hill", "Mountain"],
  "hawk": ["Grassland", "Hill", "Mountain"],
  "hunter-shark": ["Coastal", "Underwater"],
  "hyena": ["Desert", "Grassland"],
  "jackal": ["Desert", "Grassland"],
  "killer-whale": ["Coastal", "Underwater"],
  "lion": ["Grassland", "Hill"],
  "lizard": ["Desert", "Forest"],
  "mammoth": ["Arctic", "Grassland", "Hill"],
  "mastiff": ["Urban", "Grassland"],
  "mule": ["Hill", "Urban"],
  "octopus": ["Coastal", "Underwater"],
  "owl": ["Forest", "Hill"],
  "panther": ["Forest"],
  "plesiosaurus": ["Coastal", "Underwater"],
  "poisonous-snake": ["Forest", "Swamp", "Desert"],
  "polar-bear": ["Arctic", "Coastal"],
  "pony": ["Grassland", "Urban"],
  "quipper": ["Underwater"],
  "rat": ["Urban", "Underdark"],
  "raven": ["Forest", "Hill", "Urban"],
  "reef-shark": ["Coastal", "Underwater"],
  "rhinoceros": ["Grassland"],
  "riding-horse": ["Grassland", "Urban"],
  "saber-toothed-tiger": ["Arctic", "Forest", "Hill"],
  "scorpion": ["Desert"],
  "sea-horse": ["Coastal", "Underwater"],
  "spider": ["Forest", "Underdark", "Urban"],
  "stirge": ["Forest", "Swamp", "Underdark"],
  "tiger": ["Forest", "Grassland"],
  "triceratops": ["Grassland"],
  "tyrannosaurus-rex": ["Forest", "Grassland", "Swamp"],
  "vulture": ["Desert", "Grassland"],
  "warhorse": ["Grassland", "Urban"],
  "weasel": ["Forest", "Hill"],
  "wolf": ["Arctic", "Forest", "Hill", "Mountain"],

  // Celestials
  "couatl": ["Forest", "Desert", "Planar (Upper Planes)"],
  "deva": ["Planar (Upper Planes)"],
  "pegasus": ["Grassland", "Hill", "Planar (Upper Planes)"],
  "planetar": ["Planar (Upper Planes)"],
  "solar": ["Planar (Upper Planes)"],
  "unicorn": ["Forest", "Planar (Feywild)", "Planar (Upper Planes)"],

  // Constructs
  "animated-armor": ["Urban", "Underdark", "Planar (Mechanus)"],
  "clay-golem": ["Desert", "Urban"],
  "flesh-golem": ["Urban", "Underdark"],
  "flying-sword": ["Urban"],
  "homunculus": ["Urban"],
  "iron-golem": ["Urban", "Planar (Mechanus)"],
  "rug-of-smothering": ["Urban"],
  "shield-guardian": ["Urban"],
  "stone-golem": ["Mountain", "Urban", "Underdark"],

  // Dragons (patterned)
  "adult-black-dragon": ["Swamp"],
  "adult-blue-dragon": ["Desert"],
  "adult-green-dragon": ["Forest"],
  "adult-red-dragon": ["Mountain", "Planar (Elemental Plane of Fire)"],
  "adult-white-dragon": ["Arctic", "Mountain"],
  "adult-gold-dragon": ["Mountain", "Planar (Upper Planes)"],
  "adult-silver-dragon": ["Arctic", "Mountain"],

  "dragon-turtle": ["Coastal", "Underwater"],
  "wyvern": ["Hill", "Mountain"],
  "pseudodragon": ["Forest", "Urban", "Planar (Feywild)"],

  // Elementals
  "air-elemental": ["Planar (Elemental Plane of Air)"],
  "earth-elemental": ["Planar (Elemental Plane of Earth)", "Mountain"],
  "fire-elemental": ["Planar (Elemental Plane of Fire)"],
  "water-elemental": ["Planar (Elemental Plane of Water)", "Underwater"],
  "xorn": ["Planar (Elemental Plane of Earth)", "Underdark"],

  // Fey
  "blink-dog": ["Forest", "Planar (Feywild)"],
  "dryad": ["Forest", "Planar (Feywild)"],
  "satyr": ["Forest", "Grassland", "Planar (Feywild)"],
  "sprite": ["Forest", "Planar (Feywild)"],
  "green-hag": ["Swamp"],
  "sea-hag": ["Coastal", "Underwater"],

  // Fiends
  "balor": ["Planar (Abyss)"],
  "pit-fiend": ["Planar (Nine Hells)"],
  "imp": ["Urban", "Planar (Nine Hells)"],
  "succubus-incubus": ["Urban", "Planar (Lower Planes)"],
  "hell-hound": ["Desert", "Planar (Nine Hells)"],

  // Giants
  "hill-giant": ["Hill"],
  "stone-giant": ["Mountain", "Underdark"],
  "frost-giant": ["Arctic", "Mountain"],
  "fire-giant": ["Mountain", "Planar (Elemental Plane of Fire)"],
  "cloud-giant": ["Mountain"],
  "storm-giant": ["Coastal", "Underwater"],

  // Humanoids
  "goblin": ["Forest", "Hill", "Underdark"],
  "orc": ["Hill", "Mountain"],
  "kobold": ["Underdark", "Mountain"],
  "drow": ["Underdark"],
  "bandit": ["Urban", "Grassland"],
  "guard": ["Urban"],

  // Monstrosities
  "griffon": ["Hill", "Mountain"],
  "hydra": ["Swamp"],
  "kraken": ["Underwater"],
  "manticore": ["Hill", "Mountain"],
  "owlbear": ["Forest"],
  "purple-worm": ["Underdark", "Desert"],

  // Oozes
  "black-pudding": ["Underdark"],
  "gelatinous-cube": ["Underdark"],
  "gray-ooze": ["Underdark"],
  "ochre-jelly": ["Underdark"],

  // Plants
  "treant": ["Forest"],
  "shambling-mound": ["Swamp"],
  "awakened-tree": ["Forest"],
  "violet-fungus": ["Underdark"],

  // Undead
  "skeleton": ["Underdark", "Urban"],
  "zombie": ["Urban", "Underdark"],
  "ghost": ["Urban", "Underdark"],
  "ghoul": ["Underdark"],
  "lich": ["Underdark", "Urban"],
  "vampire": ["Urban"],
  "wraith": ["Underdark", "Urban"],
};

function invertCreatureHabitats(
  creatureToHabitats: Record<string, Habitat[]>,
  habitats: readonly Habitat[]
): Record<Habitat, string[]> {
  const result = Object.fromEntries(
    habitats.map((habitat) => [habitat, [] as string[]])
  ) as Record<Habitat, string[]>;

  for (const [creature, creatureHabitats] of Object.entries(creatureToHabitats)) {
    for (const habitat of creatureHabitats) {
      result[habitat].push(creature);
    }
  }

  return result;
}

export const HABITAT_TO_CREATURES = invertCreatureHabitats(
  CREATURE_TO_HABITATS,
  HABITATS
);