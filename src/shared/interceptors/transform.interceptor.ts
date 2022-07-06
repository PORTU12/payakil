/*Let's create the TransformInterceptor, which will modify each response in a trivial way to demonstrate the 
process. It will use RxJS's map() operator to assign the response object to the data property of a newly created 
object, returning the new object to the client.*/
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IResponse } from '../../apps/interfaces/response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data: data,
        /*statusCode: data?.statusCode
          ? data?.statusCode
          : context.switchToHttp().getResponse().statusCode,
        message: data.message,*/
      })),
    );
  }
}