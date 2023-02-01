import { type Middleware } from '@/types/Middleware';
import { type Route } from '@/types/Route';

export interface Router {
  middlewares?: Middleware[]
  routes: Array<Route | Router>
  basePath: string
}
