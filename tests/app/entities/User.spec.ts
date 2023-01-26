import { type Contact } from '@/app/entities/Contact';
import { User } from '@/app/entities/User';
import { describe, expect, test } from 'vitest';

describe(

  'User specifications',
  () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const hashedPassword = 'hashedPassword';
    const emptyArrayOfContacts: Contact[] = [];
    
    test('Should create a valid User',
      () => {

        const user = User.create(validName, validEmail, hashedPassword);
        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validName);
        expect(user.email).toEqual(validEmail);
        expect(user.contacts).toEqual(emptyArrayOfContacts);
      
      }
    );

  }
);
