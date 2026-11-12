export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

