import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
export interface Middleware {
  handle: (request: Request) => Promise<Request | Response>
}
