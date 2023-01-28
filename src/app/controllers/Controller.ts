import { type Request } from '@/utils/Request/Request';
import { type Response } from '@/utils/Response/Response';

export interface Controller {
  handle: (request: Request) => Promise<Response>
}
