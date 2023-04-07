import { type Controller } from '@/types/Controller';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import * as apispec from '@/../docs/openapi.json';

export default class GetOpenApiSpecController implements Controller {

  async handle (request: Request): Promise<Response> {

    const res: Response = {
      status: 200,
      body: apispec
    };

    return res;
  
  }

}
