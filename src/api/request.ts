/**
 * 封裝的 HTTP 請求模組
 * 支援標準 CRUD 操作：POST / GET / PUT / DELETE
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorBody}`);
  }
  return response.json();
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
}

function getHeaders(custom?: Record<string, string>): Record<string, string> {
  return {
    "Content-Type": "application/json",
    ...custom,
  };
}

/** POST - 新增資料 */
export async function post<T = unknown>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method: "POST",
    headers: getHeaders(options?.headers),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

/** GET - 讀取資料 */
export async function get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method: "GET",
    headers: getHeaders(options?.headers),
  });
  return handleResponse<T>(response);
}

/** PUT - 更新資料 */
export async function put<T = unknown>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method: "PUT",
    headers: getHeaders(options?.headers),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

/** DELETE - 刪除資料 */
export async function del<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method: "DELETE",
    headers: getHeaders(options?.headers),
  });
  return handleResponse<T>(response);
}

const request = { get, post, put, del };
export default request;
