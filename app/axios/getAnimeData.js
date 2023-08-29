import axios from "axios";
import { url } from "../../constants/page";
import { ANIME_QUERY_BY_ID } from "../api/apiQuery/page";

export async function getAnimeById(id) {
  try {
    const response = await axios.post(url, {
      query: ANIME_QUERY_BY_ID,
      variables: {
        id,
      },
    });
    const animeData = response.data.data.Page.media[0];
    return animeData;
  } catch (error) {
    console.error("Error fetching anime data :", error);
    return [];
  }
}

export async function getAnimeBySort(query, variables) {
  try {
    const response = await axios.post(url, {
      query,
      variables,
    });
    const animeData = response.data.data.Page;
    return animeData;
  } catch (error) {
    console.error("Error fetching anime data :", error);
    return [];
  }
}

export async function getAnimeByFilter(query, variables) {
  try {
    const response = await axios.post(url, {
      query,
      variables,
    });
    const animeData = response.data.data.Page;
    return animeData;
  } catch (error) {
    console.error("Error fetching anime data :", error);
    return [];
  }
}
