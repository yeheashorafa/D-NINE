import { ApiFailure } from '@d-nine/contracts';

export class ApiError extends Error {
  public status: number;
  public code: string;
  public errors?: ApiFailure['errors'];

  constructor(status: number, data: ApiFailure) {
    super(data.message || 'API Error');
    this.name = 'ApiError';
    this.status = status;
    this.code = data.code;
    this.errors = data.errors;
  }
}
