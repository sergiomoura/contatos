import { type Route } from './Route';

export interface WebApp {
  listen: (port: number) => void
  setRoutes: (routes: Route[]) => void
  close: () => void
}
