import { type Controller } from '@/types/Controller';
import { type HttpMethod } from '@/types/HttpMethod';
import { type Middleware } from '@/types/Middleware';
import { type Router } from '@/types/Router';

export interface Route {
  uri: string
  middlewares?: Middleware[]
  method: HttpMethod
  destiny: Controller | Router
}
