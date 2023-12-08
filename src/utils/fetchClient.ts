import { Position } from "../type/Position";
import { User } from "../type/User";

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

type RequestMethod = 'GET';

export async function getToken(): Promise<string> {
  try {
    const tokenResponse = await fetch(BASE_URL + '/token');
    if (!tokenResponse.ok) {
      throw new Error('Failed to get token');
    }

    const tokenData = await tokenResponse.json();
    return tokenData.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

export async function requestWithToken<T>(
  url: string,
  method: RequestMethod = 'GET',
  token?: string,
  data?: User,
): Promise<T> {
  try {
    const options: RequestInit = { method };
    options.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      throw new Error(`Failed to make ${method} request to ${url}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error making ${method} request with token:`, error);
    throw error;
  }
}

export const client = {
  getToken: () => requestWithToken<{ success: boolean, token: string }>('/token'),
  getUsers: (page: number, count: number) => requestWithToken<{ success: boolean, page: number, total_pages: number, total_users: number, count: number, links: { next_url: string | null, prev_url: string | null }, users: User[] }>(`/users?page=${page}&count=${count}`),
  getPositions: () => requestWithToken<{ success: boolean, positions: Position[] }>('/positions'),
};
