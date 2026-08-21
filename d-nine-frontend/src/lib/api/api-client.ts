import { ApiError } from './api-error';
import { ApiResponse } from '@d-nine/contracts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  locale?: string;
  timeoutMs?: number;
}

export async function apiClient<T>(
  endpoint: string,
  { body, locale = 'ar', timeoutMs = 15000, ...customConfig }: FetchOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Accept-Language': locale,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  config.signal = controller.signal;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    clearTimeout(id);

    let data: ApiResponse<T>;
    try {
      data = await response.json();
    } catch {
      // If we can't parse JSON (e.g. 502 Bad Gateway with HTML)
      throw new ApiError(response.status, {
        success: false,
        code: 'SERVER_UNAVAILABLE',
        message: 'The server returned an invalid response.',
        meta: { requestId: 'unknown', timestamp: new Date().toISOString() },
      });
    }

    if (!response.ok || !data.success) {
      throw new ApiError(response.status, data as Exclude<ApiResponse<T>, { success: true }>);
    }

    return data.data;
  } catch (error: unknown) {
    clearTimeout(id);
    if (error instanceof ApiError) {
      throw error;
    }
    
    if ((error as Error).name === 'AbortError') {
      throw new ApiError(408, {
        success: false,
        code: 'TIMEOUT',
        message: 'The request timed out. Please try again.',
        meta: { requestId: 'unknown', timestamp: new Date().toISOString() },
      });
    }
    
    // Network errors (e.g. CORS, offline)
    throw new ApiError(0, {
      success: false,
      code: 'NETWORK_ERROR',
      message: 'Failed to connect to the server.',
      meta: { requestId: 'unknown', timestamp: new Date().toISOString() },
    });
  }
}
