import axios from "axios";
import { baseGraphqlApiUrl } from "../Core/constants";

const url = baseGraphqlApiUrl;

export async function fetchEquipments(limit:number = 500, signal?: AbortSignal) {
  const query = `
    query Equipments($limit: Int) {
      equipments(limit: $limit) {
        ... on Armor {
          name
          weight
          index
          armor_category
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
        }
        ... on Weapon {
          index
          name
          weapon_category
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
          category_range
        }
        ... on Tool {
          name
          index
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
          tool_category
        }
        ... on Gear {
          name
          index
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
        }
        ... on Pack {
          name
          index
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
        }
        ... on Ammunition {
          name
          index
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
          }
        }
        ... on Vehicle {
          name
          index
          equipment_category {
            name
            index
          }
          gear_category {
            name
            index
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
        variables: { limit },
      },
      { signal }
    );

    return response.data.data.equipments;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}

export async function fetchEquipmentDetails(index: string, signal?: AbortSignal) {
  const query = `

  `;

  try {
    const response = await axios.post(
      url,
      {
        query,
        variables: { index },
      },
      { signal }
    );

    return response.data.data.condition;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}
