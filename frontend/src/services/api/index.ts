import { ERRORS } from "@/labels/error";
import { APIOption, APIParams } from "@/types/Api";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import io from "socket.io-client";
require("dotenv").config();

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL2 = process.env.NEXT_PUBLIC_BASE_URL2;
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";

// export const BASE_URL = "http://localhost:4000/api";
// export const BASE_URL2 = "http://localhost:4000";
// export const BASE_URL = "https://server.gamefolio.com:8080/api";
// export const BASE_URL2 = "https://server.gamefolio.com:8080";

export const API = (() => {
  const controllers = new Map<string, AbortController>();

  return async (params: APIParams): Promise<[boolean, any, Headers?]> => {
    let {
      method,
      endpoint = "",
      baseURL = "",
      payload = null,
      isToken = true,
      isFormData = false,
      file = "",
      headers = {},
      toJSON = true,
    } = params;

    method = method.toUpperCase();
    let body: string | FormData | Blob | null = null;
    let URL = `${BASE_URL}/${endpoint}`;

    if (baseURL) {
      URL = baseURL;
    }

    if (isFormData) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      body = formData;
    } else if (file) {
      const req = new Request(file);
      const resp = await fetch(req);
      body = await resp.blob();
    } else {
      body = JSON.stringify(payload);
    }

    if (isToken) {
      const token = getFromLocal("@token") || getCookieValue("gfoliotoken");
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    let options: APIOption = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
      body,
    };

    if (method === "GET") {
      delete options.body;
    }

    if (!navigator.onLine) {
      throw new Error(ERRORS.noInternet);
    }

    // Create a new AbortController for this request
    const controller = new AbortController();
    const signal = controller.signal;

    // Abort previous request if a new one is made
    if (controllers.has(endpoint)) {
      controllers.get(endpoint)?.abort();
    }
    controllers.set(endpoint, controller);

    options.signal = signal;

    try {
      let response: Response | any = await fetch(URL, options);
      const ok = response.ok;
      const headers = response.headers;

      if (toJSON === false) {
        return [ok, {}, headers];
      }

      if (response?.status === 401) {
        return [false, {}, headers];
      }

      if (response?.status !== 500) {
        response = await response.text();
        response = response ? JSON.parse(response) : {};
      } else {
        console.log(`❌ API ERR1 [${endpoint}] =====> `, response);
        response = {};
      }

      if (!ok) {
        console.log(
          `❌ API ERR2 [${endpoint}] =====> `,
          JSON.stringify(response)
        );
      }

      return [ok, response, headers];
    } catch (error) {
      if ((error as DOMException).name === "AbortError") {
        console.log(`❌ API call to [${endpoint}] was aborted`);
      } else {
        console.log(`❌ API ERR3 [${endpoint}] =====> `, error);
      }
      throw error;
    } finally {
      // Clean up the controller once the request is complete
      controllers.delete(endpoint);
    }
  };
})();

// Games List

const twitchOAuthURL = process.env.NEXT_PUBLIC_TWITCH_OAUTH_URL;
const twitchGameURL = process.env.NEXT_PUBLIC_TWITCH_GAME_URL;
const client_id = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

// Function to get the OAuth token from Twitch
async function getOAuthToken(): Promise<string> {
  const params: { [key: string]: any } = {
    client_id,
    client_secret,
    grant_type: "client_credentials",
  };

  try {
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${twitchOAuthURL}?${queryString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString,
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      const errorData = await response.json();
      throw new Error(
        `Failed to get token. Status code: ${
          response.status
        }. Response: ${JSON.stringify(errorData)}`
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to get token. Error: ${error.message}`);
  }
}

// Function to fetch top games from Twitch
async function fetchGames(
  access_token: string,
  cursor: string | null = null
): Promise<any> {
  const headers: { [key: string]: any } = {
    "Client-ID": client_id,
    Authorization: `Bearer ${access_token}`,
  };
  const params: { [key: string]: any } = {
    first: 100, // Number of games to fetch per request
  };

  if (cursor) {
    params.after = cursor;
  }

  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${twitchGameURL}?${queryString}`, {
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch games. Status code: ${
          response.status
        }. Response: ${JSON.stringify(errorData)}`
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch games. Error: ${error.message}`);
  }
}

// Main script execution
export async function fetchGameList() {
  try {
    if (!client_id || !client_secret) {
      throw new Error("Twitch client ID or client secret not provided.");
    }

    const access_token = await getOAuthToken();
    let cursor: string | null = null;
    const gamesData = await fetchGames(access_token, cursor);

    return gamesData.data;
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Socket
// export const socket = io("https://server.gamefolio.com:9090");
export const socket = io(SOCKET_URL);
