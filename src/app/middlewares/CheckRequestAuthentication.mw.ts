import { FailedResponses } from '@/errors/FailedResponses';
import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { Tokenizer } from '@/utils/Tokenizer';

export class CheckRequestAuthentication implements Middleware {

  async handle (request: Request): Promise<AuthenticatedRequest | Response> {
    
    const authHeader = (<string>(request.headers?.authorization));
    
    if (authHeader === undefined) {

      return FailedResponses.forbiden;
    
    }

    const [schema, token] = authHeader.split(' ');
    
    if (schema.toLowerCase() !== 'bearer') {

      return FailedResponses.forbiden;
    
    }
    
    const tokenOk = Tokenizer.validate(token);
    
    if (!tokenOk) {

      return FailedResponses.forbiden;
    
    }

    // const authRequest = (<AuthenticatedRequest>Object.assign({}, request, { user: Tokenizer.decode(token) }));
    const authRequest = (<AuthenticatedRequest>request);
    authRequest.user = Tokenizer.decode(token);
    console.log('no middleware...');
    console.log(authRequest.user);
    return authRequest;
  
  }

}
