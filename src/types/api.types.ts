interface ApiError {
  status?: number;
  message: string;
}

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
