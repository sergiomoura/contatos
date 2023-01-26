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
    let user: User;

    const validUserName = 'Jonh Doe';
    const validUserEmail = 'jonhdoe@test.com';
    const hashedPassword = 'hashedPassword';

    const unexistentUserEmail = 'nobody@test.com';
    const unexistentUserId = '000000';
    const unexistentContactId = '000000';
    const unexistentEmailId = '000000';

    let validEmail1;
    let validEmail2;
    let validEmail3;
    let validEmail4;
    let validEmail5;

    let validPhone1;
    let validPhone2;
    let validPhone3;
    let validPhone4;

    let contact1;
    let contact2;

    beforeEach(
      async () => {

        repository = new MemoryRepository();
        user = await repository.createUser(validUserName, validUserEmail, hashedPassword);
        validEmail1 = Email.create('contact1@test1.com');
        validEmail2 = Email.create('contact2@test1.com');
        validEmail3 = Email.create('contact3@test1.com');
        validEmail4 = Email.create('contact4@test1.com');
        validEmail5 = Email.create('contact5@test1.com');
        validPhone1 = PhoneNumber.create('111111');
        validPhone2 = PhoneNumber.create('222222');
        validPhone3 = PhoneNumber.create('333333');
        validPhone4 = PhoneNumber.create('444444');
        contact1 = Contact.create('Contact One');
        contact2 = Contact.create('Contact One');
      
      }
    );

    test('Should create a user',
      async () => {

        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validUserName);
        expect(user.email).toEqual(validUserEmail);
        expect(user.password).toEqual(hashedPassword);
      
      }
    );

    test('Should recover user by its email',
      async () => {

        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeInstanceOf(User);
        expect(loadedUser).toEqual(user);
      
      }
    );

    test('Should return undefined when trying to get user by unexisting email',
      async () => {

        const loadedUser = await repository.getUserByEmail(unexistentUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );

    test('Should throw an exception trying to delete unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.deleteUser(unexistentUserId); });
        await assertion.rejects.toThrow(Errors.unexistentUserError);
      
      }
    );

    test('Should delete user form repository',
      async () => {

        await repository.deleteUser(user.id);
        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );

    test('Should throw an exception trying to add a contact to unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.addContactToUser(unexistentUserId, contact1); });
        await assertion.rejects.toThrowError(Errors.unexistentUserError);
      
      }
    );

    test('Should throw an exception trying to recover contacts from unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.getContactsByUser(unexistentUserId); });
        await assertion.rejects.toThrowError(Errors.unexistentUserError);
      
      }
    );

    test('Should add contacts to user and then recover them',
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

    test('Should throw an error trying to add phoneNumber to unexistent contact',
    
      async () => {

        const assertion = expect(async () => { await repository.addPhoneNumberToContact(unexistentContactId, validPhone1); }); ;
        await assertion.rejects.toThrowError(Errors.unexistentContactError);
      
      }
    
    );

    test('Should add phone number to contact',
    
      async () => {

        await repository.addContactToUser(user.id, contact1);
        
        await repository.addPhoneNumberToContact(contact1.id, validPhone1);
        const contacts = await repository.getContactsByUser(user.id);
        const phoneNumbers = contacts[contacts.length - 1].phoneNumbers;
        expect(phoneNumbers[phoneNumbers.length - 1]).toEqual(validPhone1);
      
      }

    );

    test('Should throw an error trying to delete unexistent email',
      async () => {

        const assertion = expect(async () => { await repository.deleteEmail(unexistentEmailId); });
        await assertion.rejects.toThrowError(Errors.unexistentEmailError);
      
      }
    );

    test('Should delete email by its id',
      async () => {

        await repository.addContactToUser(user.id, contact1);
        
        await repository.addEmailToContact(contact1.id, validEmail1);
        await repository.addEmailToContact(contact1.id, validEmail2);
        await repository.addEmailToContact(contact1.id, validEmail3);
        await repository.addEmailToContact(contact1.id, validEmail4);

        await repository.deleteEmail(validEmail3.id);
        const contacts = await repository.getContactsByUser(user.id);
        const emails = contacts[contacts.length - 1].emails;
        expect(emails).toEqual([validEmail1, validEmail2, validEmail4]);
      
      });
  
  }
);
