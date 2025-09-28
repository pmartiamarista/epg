/**
 * Custom API client using native fetch with timeout and error handling
 * Provides a consistent interface for making HTTP requests with proper error handling
 */
import { validatedEnv } from "@/constants/env";
import { buildQueryParams } from "@/utils/buildQueryParams/buildQueryParams";

import { type ApiResponse, HTTP_METHODS } from "@/types/api.types";

/**
 * API Client class for making HTTP requests
 * Handles timeouts, error responses, and provides typed responses
 */
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  /**
   * Creates a new API client instance
   * @param baseURL - The base URL for all API requests
   */
  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Core request method with timeout and error handling
   * @param endpoint - The API endpoint to call
   * @param options - Fetch options (method, headers, body, etc.)
   * @param timeoutMs - Request timeout in milliseconds (default: 10000)
   * @returns Promise with either data or error
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeoutMs = 10000
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
      signal: controller.signal,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeout);

      if (!response.ok) {
        return {
          error: {
            status: response.status,
            message: `HTTP ${response.status}: ${response.statusText}`,
          },
        };
      }

      const data = await response.json();

      return { data };
    } catch (error) {
      clearTimeout(timeout);
      return {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Network error or request aborted",
        },
      };
    }
  }

  /**
   * Performs a GET request with optional query parameters
   * @param endpoint - The API endpoint
   * @param headers - Optional custom headers
   * @param queryParams - Optional query parameters to append to URL
   * @returns Promise with API response
   */
  async get<T>(
    endpoint: string,
    headers?: Record<string, string>,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const fullEndpoint = queryParams
      ? `${endpoint}${buildQueryParams(queryParams)}`
      : endpoint;
    return this.request<T>(fullEndpoint, {
      method: HTTP_METHODS.GET,
      headers,
    });
  }

  /**
   * Performs a POST request with JSON body
   * @param endpoint - The API endpoint
   * @param data - Optional data to send in request body
   * @param headers - Optional custom headers
   * @returns Promise with API response
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HTTP_METHODS.POST,
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  /**
   * Performs a PUT request with JSON body
   * @param endpoint - The API endpoint
   * @param data - Optional data to send in request body
   * @param headers - Optional custom headers
   * @returns Promise with API response
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HTTP_METHODS.PUT,
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  /**
   * Performs a DELETE request
   * @param endpoint - The API endpoint
   * @param headers - Optional custom headers
   * @returns Promise with API response
   */
  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HTTP_METHODS.DELETE,
      headers,
    });
  }
}

/**
 * Global API client instance configured with environment variables
 * Use this instance throughout the application for API calls
 */
export const apiClientInstance = new ApiClient(validatedEnv.VITE_API_URL);
