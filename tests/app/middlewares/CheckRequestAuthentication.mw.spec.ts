import { CheckRequestAuthentication } from '@/middlewares/CheckRequestAuthentication.mw';
import { FailedResponses } from '@/errors/FailedResponses';
import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Request } from '@/types/Request';
import { Tokenizer } from '@/utils/Tokenizer';
import { describe, test, expect } from 'vitest';

describe('CheckRequestAuthentication Specification',
  () => {

    const userData = {
      id: 'abcdefghijklmnopkrstuvwxyz',
      name: 'teste',
      email: 'teste@teste.com'
    };

    const validToken = Tokenizer.create(userData);
    const validRequest = <Request>{
      headers: {
        Authorization: `bearer ${validToken}`
      }
    };

    const noAuthorizarionRequest = <Request>{
      headers: {}
    };

    const invalidTokenRequest = <Request>{
      headers: {
        Authorization: 'bearer invalid-token'
      }
    };

    const checkRequestAuthentication = new CheckRequestAuthentication();
    
    test('Should get an error - no authorization header', async () => {

      const result = await checkRequestAuthentication.handle(noAuthorizarionRequest);
      expect(result).toEqual(FailedResponses.forbiden);
    
    });

    test('Should get an error - invalid token', async () => {

      const result = await checkRequestAuthentication.handle(invalidTokenRequest);
      expect(result).toEqual(FailedResponses.forbiden);
    
    });

    test('Should get an AuthenticatedRequest', async () => {

      const result = <AuthenticatedRequest>(await checkRequestAuthentication.handle(validRequest));
      expect(result.user).toEqual(userData);
    
    });
  
  }
);
