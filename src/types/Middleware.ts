import { type Request } from '@/types/Request';

export interface Middleware {
  handle: (request: Request) => Promise<Request>
}
