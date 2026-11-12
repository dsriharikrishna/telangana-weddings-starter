import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((res) => {
        // If response is already formatted as ApiResponse, return directly
        if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
          return res;
        }

        return {
          success: true,
          message: res?.message || 'Success',
          data: res?.data !== undefined ? res.data : res,
          meta: res?.meta || null,
        };
      }),
    );
  }
}

