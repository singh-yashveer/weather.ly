import {
  BASE_URL,
  CITY_ACCESS_TOKEN,
  CITY_CLIENT_ID,
  CITY_CLIENT_SECRET,
  TOKEN_URL,
} from "../consts";

let accessToken = CITY_ACCESS_TOKEN;
const fetchNewAccessToken = async () => {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CITY_CLIENT_ID,
      client_secret: CITY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token.");
  }

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
};

export const fetchCities = async (keyword: string) => {
  let response = await fetch(`${BASE_URL}?keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    await fetchNewAccessToken();

    response = await fetch(`${BASE_URL}?keyword=${keyword}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  if (!response.ok) {
    throw new Error("Failed to fetch cities.");
  }

  return response.json();
};
