import { Contact } from '@/app/entities/Contact';
import { Email } from '@/app/entities/Email';
import { PhoneNumber } from '@/app/entities/PhoneNumber';
import { User } from '@/app/entities/User';
import { Errors } from '@/app/Errors';
import { MemoryRepository } from '@/app/repositories/adapters/MemoryRepository';
import { type Repository } from '@/app/repositories/Repository';
import { beforeEach, describe, expect, test } from 'vitest';

describe(

  'MemoryRepository specifications',
  () => {
    
    let repository: Repository;
    const validUserName = 'Jonh Doe';
    const validUserEmail = 'jonhdoe@test.com';
    const unexistentUserEmail = 'nobody@test.com';
    const unexistentUserId = '000000';
    const hashedPassword = 'hashedPassword';

    const contact1Emails = [Email.create('contact1@test1.com'), Email.create('contact1@test2.com')];
    const contact1PhoneNumbers = [PhoneNumber.create('1111'), PhoneNumber.create('2222')];
    const contact1 = Contact.create('Contact One', contact1Emails, contact1PhoneNumbers);
    
    const contact2Emails = [Email.create('contact2@test1.com'), Email.create('contact2@test2.com')];
    const contact2PhoneNumbers = [PhoneNumber.create('3333'), PhoneNumber.create('4444')];
    const contact2 = Contact.create('Contact One', contact2Emails, contact2PhoneNumbers);

    let user: User;

    beforeEach(
      async () => {

        repository = new MemoryRepository();
        user = await repository.createUser(validUserName, validUserEmail, hashedPassword);
      
      }
    );

    test(
      'Should create a user',
      async () => {

        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validUserName);
        expect(user.email).toEqual(validUserEmail);
        expect(user.password).toEqual(hashedPassword);
      
      }
    );

    test(
      'Should recover user by its email',
      async () => {

        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeInstanceOf(User);
        expect(loadedUser).toEqual(user);
      
      }
    );

    test(
      'Should return undefined when trying to get user by unexisting email',
      async () => {

        const loadedUser = await repository.getUserByEmail(unexistentUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );

    test(
      'Should throw an exception trying to delete unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.deleteUser(unexistentUserId); });
        await assertion.rejects.toThrow(Errors.unexistentUserError);
      
      }
    );

    test(
      'Should delete user form repository',
      async () => {

        await repository.deleteUser(user.id);
        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );

    test(
      'Should throw an exception trying to add a contact to unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.addContactToUser(unexistentUserId, contact1); });
        await assertion.rejects.toThrow(Errors.unexistentUserError);
      
      }
    );

    test(
      'Should add a contact to the user',
      async () => {

        expect(user.contacts).toEqual([]);

        await repository.addContactToUser(user.id, contact1);
        expect(user.contacts).toEqual([contact1]);
        
        await repository.addContactToUser(user.id, contact2);
        expect(user.contacts).toEqual([contact1, contact2]);
      
      }
    );
  
  }
);
