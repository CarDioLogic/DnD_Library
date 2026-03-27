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
        desc
        concentration
        casting_time
        duration
        range
        ritual
        school {
          index
          name
          desc
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

export async function fetchSpellExtraDetails(index: string, signal?: AbortSignal) {
  const query = `
    query Spell($index: String!) {
      spell(index: $index) {
        index
        name
        level
        higher_level
        components
        attack_type
        classes {
          name
          index
        }
        material  
               
        area_of_effect {
          size
          type
        }
        heal_at_slot_level {
          level
          value
        }        
        damage {
          damage_type {
            name
            index
          }
          damage_at_slot_level {
            value
            level
          }
          damage_at_character_level {
            level
            value
          }
        }
        dc {
          dc_success
          desc
          dc_type {
            full_name
          }
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