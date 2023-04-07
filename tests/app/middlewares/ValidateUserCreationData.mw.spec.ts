import { ValidateUserCreationData } from '@/middlewares/ValidateUserCreationData.mw';
import { FailedResponses } from '@/errors/FailedResponses';
import { type Request } from '@/types/Request';
import { describe, test, expect } from 'vitest';

const middleware = new ValidateUserCreationData();
const validRequest: Request = {
  body: {
    name: 'Jonh Doe',
    email: 'jonhdoe@test.com',
    password: '123456'
  }
};
const invalidRequest: Request = {
  body: {
    name: 'oo',
    email: 'notanemail',
    password: 'short'
  }
};

describe(
  'ValidateUserCreationData.mw specifications',
  () => {

    test('Should get a response with 400 status',
      async () => {

        const result = await middleware.handle(invalidRequest);
        expect(result).toEqual(FailedResponses.invalidDataForUserCreation);
        
      }
    );

    test('Should return the request as is',
      async () => {

        const request = await middleware.handle(validRequest);
        expect(request).toEqual(validRequest);
      
      }
    );
  
  }
);
