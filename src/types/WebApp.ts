import { type Router } from './Router';

export interface WebApp {
  listen: (port: number) => void
  setRouter: (router: Router) => void
  close: () => void
}
