import { type Controller } from '@/types/Controller';
import { type HttpMethod } from '@/types/HttpMethod';
import { type Middleware } from '@/types/Middleware';

export type Route = {
  path: string
  middlewares?: Middleware[]
  method: HttpMethod
  controller: Controller
};
