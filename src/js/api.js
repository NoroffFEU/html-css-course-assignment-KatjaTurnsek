export const API_BASE_URL = "https://v2.api.noroff.dev/";

export async function fetchFromApi(endpoint) {
  const errorMessage =
    "Sorry, we couldn't load the data. Please try again later.";

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData.errors
        )}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const container = document.querySelector("#productContainer");
    if (container) {
      container.innerHTML = `<p class="error-message">${
        error.message.includes("NetworkError")
          ? "Network issue detected. Please check your internet connection and try again."
          : error.message.includes("404")
          ? "The requested resource was not found. Please try again later."
          : "Sorry, we couldn't load the data. Please try again later."
      }</p>`;
    }

    return null;
  }
}
