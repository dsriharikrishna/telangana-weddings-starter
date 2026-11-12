import API_ENDPOINTS from './endpoints/apiEndpoints';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1';
const DEFAULT_TIMEOUT = 15000;

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

// 1. Helper to parse backend error responses
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

// 2. Helper to fetch stored token
function getAuthToken(providedToken: string | null): string | null {
  if (providedToken) return providedToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tw_access_token');
  }
  return null;
}

// 3. Helper to trigger session logout
function triggerLogout(message = 'Session expired. Please login again.') {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('tw_access_token');
    localStorage.removeItem('tw_refresh_token');
    localStorage.removeItem('tw_user');
  }
  throw new Error(message);
}

// 4. Token refresh logic
async function refreshSessionToken(currentRefreshToken: string): Promise<void> {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    const refreshRes = await fetch(`${BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    if (!refreshRes.ok) {
      throw new Error('AUTH_EXPIRED');
    }

    const data = await refreshRes.json();
    const newAccessToken = data.data?.accessToken;
    if (newAccessToken && typeof window !== 'undefined') {
      localStorage.setItem('tw_access_token', newAccessToken);
      if (data.data?.refreshToken) {
        localStorage.setItem('tw_refresh_token', data.data.refreshToken);
      }
      onRefreshed(newAccessToken);
    }
  } catch (error) {
    onRefreshed(null);
    triggerLogout();
  } finally {
    isRefreshing = false;
  }
}

// 5. Main apiFetch wrapper
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token: string | null = null,
  timeout = DEFAULT_TIMEOUT,
  retryCount = 0,
): Promise<T> {
  if (retryCount >= 3) {
    throw new Error('Max retries reached for API call');
  }

  const authToken = getAuthToken(token);
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

    // Handle 401 token refresh retry
    if (res.status === 401 && typeof window !== 'undefined') {
      const refreshToken = localStorage.getItem('tw_refresh_token');
      if (refreshToken && !path.includes('/auth/')) {
        refreshSessionToken(refreshToken);
        return new Promise<T>((resolve, reject) => {
          addRefreshSubscriber((newToken) => {
            if (!newToken) return reject(new Error('Session expired'));
            apiFetch<T>(path, options, newToken, timeout, retryCount + 1)
              .then(resolve)
              .catch(reject);
          });
        });
      }
    }

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
