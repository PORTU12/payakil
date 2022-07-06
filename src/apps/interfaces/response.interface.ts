export interface IResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  params?: [];
  errors?: any[];
}
