import axios from "axios";
import { baseApiUrl } from "../Core/constants";

const url = baseApiUrl + "/monsters";

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
        alignment
        charisma
        constitution
        dexterity
        intelligence
        strength
        wisdom
        type
        xp
        size
        name
        hit_points
        hit_dice
        image
        index
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