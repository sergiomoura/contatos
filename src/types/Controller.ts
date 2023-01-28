import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';

export interface Controller {
  handle: (request: Request) => Promise<Response>
}
