import axios from "axios";
import { baseGraphqlApiUrl } from "../Core/constants";

const url = baseGraphqlApiUrl;

export async function fetchSpells() {
  const query = `
    query GetSpells {
      spells {
        index
        name
        school {
          index
          name
        }
        classes {
            name
            index
        }
      }
    }
  `;

  try {
    const response = await axios.post(url, { query });

    return response.data.data.spells;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}

export async function fetchSpellDetails(index: string, signal?: AbortSignal) {
  const query = `
    query Spell($index: String!) {
      spell(index: $index) {
        index
        name
        school {
          index
          name
          desc
        }
        desc
        duration
        higher_level
        level
        material
        range
        ritual
        area_of_effect {
          size
          type
        }
        concentration
        casting_time
        attack_type
        heal_at_slot_level {
          level
          value
        }
        components
        classes {
          name
          index
        }
      }
    }
  `;

  try {
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

    return response.data.data.spell;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}