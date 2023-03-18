import { FailedResponses } from '@/errors/FailedResponses';
import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { Tokenizer } from '@/utils/Tokenizer';

export class CheckRequestAuthentication implements Middleware {

  async handle (request: Request): Promise<AuthenticatedRequest | Response> {

    const authHeader = (<string>(request.headers?.Authorization));
    if (authHeader === undefined) {

      return FailedResponses.forbiden;
    
    }
    
    const token = authHeader.replace('bearer ', '');
    const tokenOk = Tokenizer.validate(token);
    if (!tokenOk) {

      return FailedResponses.forbiden;
    
    }

    return (<AuthenticatedRequest>Object.assign({}, request, { user: Tokenizer.decode(token) }));
  
  }

}
