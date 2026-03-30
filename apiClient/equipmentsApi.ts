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
    query Equipment($index: String!) {
      equipment(index: $index) {
        ... on Armor {
          index
          name
          cost {
            quantity
            unit
          }
          weight
          str_minimum
          stealth_disadvantage
          armor_category
          gear_category {
            name
          }
          equipment_category {
            name
          }
          armor_class {
            base
            dex_bonus
            max_bonus
          }
          properties {
            name
            desc
          }
        }
        ... on Weapon {
          index
          name
          
          cost {
            quantity
            unit
          }
          weight
          gear_category {
            name
          }
          equipment_category {
            name
          }
          properties {
            name
            desc
          }
          damage {
            damage_type {
              name
              index
            }
            damage_dice
          }
          range {
            normal
            long
          }
          throw_range {
            long
            normal
          }
          two_handed_damage {
            damage_type {
              index
              name
            }
            damage_dice
          }
          weapon_range
          weapon_category
          category_range
        }
        ... on Tool {
          index
          name
          gear_category {
            index
            name
          }
          equipment_category {
            index
            name
          }
          cost {
            unit
            quantity
          }
          properties {
            name
            desc
          }
          tool_category
          weight
        }
        ... on Gear {
          index
                name
          gear_category {
            index
            name
          }
          equipment_category {
            index
            name
          }
          cost {
            unit
            quantity
          }
          properties {
            name
            desc
          }
          weight
        }
        ... on Pack {
          index
                name
          gear_category {
            index
            name
          }
          equipment_category {
            index
            name
          }
          cost {
            unit
            quantity
          }
          properties {
            name
            desc
          }
          
          weight

        }
        ... on Ammunition {
          index
                name
          gear_category {
            index
            name
          }
          equipment_category {
            index
            name
          }
          cost {
            unit
            quantity
          }
          properties {
            name
            desc
          }      
          weight
          quantity
        }
        ... on Vehicle {
          index
                name
          gear_category {
            index
            name
          }
          equipment_category {
            index
            name
          }
          cost {
            unit
            quantity
          }
          properties {
            name
            desc
          }
          
          weight
          speed {
            unit
            quantity
          }
          vehicle_category
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
      { signal }
    );

    return response.data.data.equipment;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}
