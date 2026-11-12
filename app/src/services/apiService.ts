import API_ENDPOINTS from './endpoints/apiEndpoints';

// Use 10.0.2.2 for Android emulator or localhost for web/iOS
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3002/api/v1';
const DEFAULT_TIMEOUT = 15000;

let memoryToken: string | null = null;
let memoryRefreshToken: string | null = null;

export function setAppAuthTokens(accessToken: string | null, refreshToken: string | null = null) {
  memoryToken = accessToken;
  if (refreshToken) memoryRefreshToken = refreshToken;
}

async function parseError(res: Response): Promise<Error> {
  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await res.json();
      const message = errorData.message || errorData.error || `Error ${res.status}`;
      return new Error(Array.isArray(message) ? message.join(', ') : message);
    }
    return new Error(`Server returned ${res.status}: ${res.statusText}`);
  } catch {
    return new Error(`Network error (${res.status})`);
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token: string | null = null,
  timeout = DEFAULT_TIMEOUT,
): Promise<T> {
  const authToken = token || memoryToken;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    };

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw await parseError(res);
    }

    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const json = await res.json();
      return json as T;
    }

    return {} as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return Promise.reject(new Error('Request timeout'));
    }
    return Promise.reject(error);
  }
}

const apiService = {
  get: <T>(p: string, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(p, { ...o, method: 'GET' }, t),

  post: <T>(p: string, d?: unknown, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(
      p,
      { ...o, method: 'POST', body: d ? JSON.stringify(d) : undefined },
      t,
    ),

  put: <T>(p: string, d?: unknown, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(
      p,
      { ...o, method: 'PUT', body: d ? JSON.stringify(d) : undefined },
      t,
    ),

  patch: <T>(
    p: string,
    d?: unknown,
    t: string | null = null,
    o?: RequestInit,
  ) =>
    apiFetch<T>(
      p,
      { ...o, method: 'PATCH', body: d ? JSON.stringify(d) : undefined },
      t,
    ),

  delete: <T>(p: string, t: string | null = null, o?: RequestInit) =>
    apiFetch<T>(p, { ...o, method: 'DELETE' }, t),
};

export default apiService;
export { API_ENDPOINTS };

