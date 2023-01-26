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
    const hashedPassword = 'hashedPassword';

    const unexistentUserEmail = 'nobody@test.com';
    const unexistentUserId = '000000';
    const unexistentContactId = '000000';

    const validEmail1 = Email.create('contact1@test1.com');
    const validEmail2 = Email.create('contact2@test1.com');
    const validEmail3 = Email.create('contact3@test1.com');
    const validEmail4 = Email.create('contact4@test1.com');
    const validEmail5 = Email.create('contact4@test1.com');

    const validPhone1 = PhoneNumber.create('111111');
    const validPhone2 = PhoneNumber.create('222222');
    const validPhone3 = PhoneNumber.create('333333');
    const validPhone4 = PhoneNumber.create('444444');

    const contact1Emails = [validEmail1, validEmail2];
    const contact1PhoneNumbers = [validPhone1, validPhone2];
    const contact1 = Contact.create('Contact One', contact1Emails, contact1PhoneNumbers);
    
    const contact2Emails = [validEmail3, validEmail4];
    const contact2PhoneNumbers = [validPhone3, validPhone4];
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
        await assertion.rejects.toThrowError(Errors.unexistentUserError);
      
      }
    );

    test(
      'Should throw an exception trying to recover contacts from unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.getContactsByUser(unexistentUserId); });
        await assertion.rejects.toThrowError(Errors.unexistentUserError);
      
      }
    );

    test(
      'Should add contacts to user and then recover them',
      async () => {

        let contacts = await repository.getContactsByUser(user.id);
        expect(contacts).toEqual([]);

        await repository.addContactToUser(user.id, contact1);
        contacts = await repository.getContactsByUser(user.id);
        expect(contacts).toEqual([contact1]);

        await repository.addContactToUser(user.id, contact2);
        contacts = await repository.getContactsByUser(user.id);
        expect(contacts).toEqual([contact1, contact2]);
      
      }
    );

    test('Should throw an error trying to delete unexistent contact',
      async () => {

        const assertion = expect(async () => { await repository.deleteContact(unexistentContactId); });
        await assertion.rejects.toThrowError(Errors.unexistentContactError);
      
      }
    );

    test('Should delete a contact',
      async () => {

        await repository.addContactToUser(user.id, contact1);
        await repository.addContactToUser(user.id, contact2);
        
        await repository.deleteContact(contact1.id);
        let contacts = await repository.getContactsByUser(user.id);
        expect(contacts).toEqual([contact2]);

        await repository.deleteContact(contact2.id);
        contacts = await repository.getContactsByUser(user.id);
        expect(contacts).toEqual([]);
      
      }
    );

    test('Should throw an error trying to add email to unexistent contact',
      async () => {

        const assetion = expect(async () => { await repository.addEmailToContact(unexistentContactId, validEmail5); });
        await assetion.rejects.toThrowError(Errors.unexistentContactError);
      
      }
    );

    test('Should add an email to a contact',
      async () => {

        await repository.addContactToUser(user.id, contact1);
        await repository.addEmailToContact(contact1.id, validEmail5);
        const contacts = await repository.getContactsByUser(user.id);
        const emails = contacts[contacts.length - 1].emails;
        expect(emails[emails.length - 1]).toEqual(validEmail5);
      
      }
    );
  
  }
);
