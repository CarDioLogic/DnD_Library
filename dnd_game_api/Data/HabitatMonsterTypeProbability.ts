
import { MonsterType } from "./MonsterTypes";
import { HabitatSlug } from "./Habitats";
//should show a list of habitats and the probability of finding a type of monster in it
//can be used to obtain a random monster of a certain type based on habitat

type HabitatMonsterTypeProbability = {
  habitat: HabitatSlug;
  probabilities: Partial<Record<MonsterType, number>>;
};
export const habitatData: HabitatMonsterTypeProbability[] = [
  {
    habitat: "forest",
    probabilities: {
      beast: 0.35,
      humanoid: 0.25,
      fey: 0.2,
      plant: 0.1,
      monstrosity: 0.08,
      dragon: 0.02,
    },
  },
  {
    habitat: "swamp",
    probabilities: {
      ooze: 0.25,
      undead: 0.25,
      beast: 0.2,
      monstrosity: 0.15,
      plant: 0.1,
      fiend: 0.05,
    },
  },
  {
    habitat: "mountain",
    probabilities: {
      dragon: 0.25,
      giant: 0.25,
      beast: 0.2,
      elemental: 0.15,
      humanoid: 0.1,
      monstrosity: 0.05,
    },
  },
  {
    habitat: "grassland",
    probabilities: {
      beast: 0.4,
      humanoid: 0.3,
      monstrosity: 0.15,
      fey: 0.1,
      dragon: 0.05,
    },
  },
  {
    habitat: "arctic",
    probabilities: {
      beast: 0.35,
      elemental: 0.25,
      giant: 0.2,
      undead: 0.1,
      monstrosity: 0.1,
    },
  },
  {
    habitat: "coastal",
    probabilities: {
      beast: 0.3,
      humanoid: 0.25,
      elemental: 0.2,
      monstrosity: 0.15,
      dragon: 0.1,
    },
  },
  {
    habitat: "hill",
    probabilities: {
      humanoid: 0.35,
      beast: 0.25,
      giant: 0.2,
      monstrosity: 0.1,
      fey: 0.1,
    },
  },
  {
    habitat: "underdark",
    probabilities: {
      aberration: 0.25,
      ooze: 0.2,
      undead: 0.2,
      monstrosity: 0.15,
      humanoid: 0.1,
      construct: 0.1,
    },
  },
  {
    habitat: "urban",
    probabilities: {
      humanoid: 0.5,
      construct: 0.15,
      undead: 0.1,
      fiend: 0.1,
      monstrosity: 0.1,
      aberration: 0.05,
    },
  },
];