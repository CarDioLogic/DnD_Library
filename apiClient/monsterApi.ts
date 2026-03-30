import axios from "axios";
import { baseGraphqlApiUrl } from "../Core/constants";

const url = baseGraphqlApiUrl + "/monsters";

export async function fetchMonstersByType(type: string) {
  const query = `
    query GetMonsters($type: String!) {
      monsters(type: $type) {
        index
        name
        type
      }
    }
  `;

  try {
    const response = await axios.post(url, {
      query,
      variables: { type },
    });

    return response.data.data.monsters;
  } catch (error) {
    console.error("GraphQL error:", error);
    throw error;
  }
}

export async function fetchMonsterDetails(index: string, signal?: AbortSignal) {
  const query = `
    query Monster($index: String!) {
      monster(index: $index) {
        index
        name
        type
        subtype
        image
        alignment

        charisma
        constitution
        dexterity
        intelligence
        strength
        wisdom

        challenge_rating
        xp
        size
        hit_points
        hit_points_roll
        hit_dice

        armor_class {
          ... on ArmorClassDex {
            value
            type
            desc
          }
          ... on ArmorClassNatural {
            desc
            type
            value
          }
          ... on ArmorClassArmor {
            value
            type
            desc
          }
          ... on ArmorClassSpell {
            value
            type
            desc
          }
          ... on ArmorClassCondition {
            value
            type
            desc
          }
        }
      }
    }
  `;

  const response = await axios.post(
    url,
    {
      query,
      variables: { index },
    },
    {
      signal,
    }
  );

  return response.data.data.monster;
}

export async function fetchMonsterActions(index: string, signal?: AbortSignal) {
  const query = `
    query Monster($index: String!) {
      monster(index: $index) {
       actions {
          name
          desc
          multiattack_type
          attack_bonus
          damage {
            ... on Damage {
              damage_dice
              damage_type {
                name
                index
              }
            }
          }
          actions {
            action_name
            count
            type
          }
          dc {
            dc_value
            dc_type {
              index
              name
            }
          }
        }
        speed {
          burrow
          climb
          fly
          hover
          swim
          walk
        }
      }
    }
  `;

  const response = await axios.post(
    url,
    {
      query,
      variables: { index },
    },
    {
      signal,
    }
  );

  return response.data.data.monster;
}

export async function fetchMonsterSpecialAndLegendaryActions(index: string, signal?: AbortSignal) {
  const query = `
    query Monster($index: String!) {
      monster(index: $index) {
        legendary_actions {
          name
          desc
          attack_bonus
          damage {
            damage_dice
            damage_type {
              name
              index
            }
          }
          dc {
            dc_value
            dc_type {
              index
              name
            }
          }
        }
        special_abilities {
          name
          desc

          usage {
            times
            type
            rest_types
          }
        }
      }
    }
  `;

  const response = await axios.post(
    url,
    {
      query,
      variables: { index },
    },
    {
      signal,
    }
  );

  return response.data.data.monster;
}

export async function fetchMonsterSensesProficienciesReactionsResistances(index: string, signal?: AbortSignal) {
  const query = `
    query Monster($index: String!) {
      monster(index: $index) {
        senses {
          blindsight
          darkvision
          passive_perception
          tremorsense
          truesight
        }
        languages
        proficiencies {
          value
          proficiency {
            name
          }
        }
        reactions {
          name
          desc
          dc {
            dc_value
            dc_type {
              name
              desc
            }
          }
        }
        damage_vulnerabilities
        damage_resistances
        damage_immunities
        condition_immunities {
          name
          desc
        }
      }
    }
  `;

  const response = await axios.post(
    url,
    {
      query,
      variables: { index },
    },
    {
      signal,
    }
  );

  return response.data.data.monster;
}