import { describe, test, expect } from 'vitest';
import { Email } from '@/app/entities/Email';
import { Errors } from '@/errors/Errors';
describe(

  'Email specifications',
  
  () => {

    const validEmail = 'teste@teste.com';
    const invalidEmail = 'teste';

    test('Should throw an error',
      () => {

        expect(() => { return Email.create(invalidEmail); }).toThrowError(Errors.invalidEmailError);

      }
    );

    test('Should create an Email object',
      () => {

        const email = Email.create(validEmail);
        expect(Email.create(validEmail)).toBeInstanceOf(Email);
        expect(email.address).toEqual(validEmail);

      }
    );
  
  }

);
