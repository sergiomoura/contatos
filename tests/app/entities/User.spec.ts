import { User } from '@/app/entities/User';
import { describe, expect, test } from 'vitest';

describe(

  'User specifications',
  () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const hashedPassword = 'hashedPassword';
    
    test('Should create a valid User',
      () => {

        const user = User.create(validName, validEmail, hashedPassword);
        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validName);
        expect(user.email).toEqual(validEmail);
      
      }
    );

  }
);
