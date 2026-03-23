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
        hit_dice
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
        index,
        name,
        type,
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
        }
        legendary_actions {
          name
          desc
          attack_bonus
          damage {
            damage_dice
            damage_type {
              name
              desc
              index
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