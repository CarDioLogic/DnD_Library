import axios from "axios";
import { baseGraphqlApiUrl } from "../core/constants";

const url = baseGraphqlApiUrl;

export async function fetchAilments() {
  const query = `
    query GetfetchAilments {
      conditions {
        index
        name
      }
      damageTypes {
        index
        name
      }
    }
  `;

  try {
    const response = await axios.post(url, { query });
    return response.data.data;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}

export async function fetchConditionDetails(index: string, signal?: AbortSignal) {
  const query = `
    query Condition($index: String!) {
      condition(index: $index) {
        index
        name
        desc
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

    return response.data.data.condition;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}

export async function fetchDamageTypeDetails(index: string, signal?: AbortSignal) {
  const query = `
    query DamageType($index: String!) {
      damageType(index: $index) {
        index
        name
        desc
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

    return response.data.data.damageType;
  } catch (error: any) {
    console.error("GraphQL error body:", error.response?.data);
    console.error("GraphQL error:", error);
    throw error;
  }
}