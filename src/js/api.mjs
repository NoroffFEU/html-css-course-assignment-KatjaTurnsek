import { API_BASE_URL } from "./config.mjs";

export async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

fetchWithToken(API_BASE_URL + "/api/v1/social/posts");

export async function getPosts() {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPosts:", error);
    throw error;
  }
}
