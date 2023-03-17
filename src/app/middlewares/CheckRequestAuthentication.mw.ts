import { FailedResponses } from '@/errors/FailedResponses';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { Tokenizer } from '@/utils/Tokenizer';

export class CheckRequestAuthentication {

  async handle (request: Request): Promise<Request | Response> {

    const authHeader = (<string>(request.headers?.Authorization));
    if (authHeader === undefined) {

      return FailedResponses.forbiden;
    
    }
    
    const token = authHeader.replace('bearer ', '');
    const tokenOk = Tokenizer.validate(token);
    if (!tokenOk) {

      return FailedResponses.forbiden;
    
    }

    const authRequest = Object.assign({}, request, { user: Tokenizer.decode(token) });
    return authRequest;
  
  }

}
