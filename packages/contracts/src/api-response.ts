export interface ApiSuccess<T> {
  success: true;
  code: string;
  message: string;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

export interface ApiFailure {
  success: false;
  code: string;
  message: string;
  errors?: Array<{
    field?: string;
    code: string;
    message: string;
  }>;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
