import { ValidateUserCreationData } from '@/app/middlewares/ValidateUserCreationData.mw';
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

    test('Should throw an error',
      async () => {

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const tryToHandle = async () => { await middleware.handle(invalidRequest); };
        await expect(tryToHandle).rejects.toThrow();
      
      }
    );

    test('Should return the request as is',
      async () => {

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const request = await middleware.handle(validRequest);
        expect(request).toEqual(validRequest);
      
      }
    );
  
  }
);
