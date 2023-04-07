import { Contact } from '@/entities/Contact';
import { Email } from '@/entities/Email';
import { PhoneNumber } from '@/entities/PhoneNumber';
import { AddContactUseCase } from '@/usecases/AddContactUseCase';
import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';
import { ListContactsUseCase } from '@/usecases/ListContactsUseCase';
import { Errors } from '@/errors/Errors';
import { Infra } from '@/Infra';
import { describe, expect, test } from 'vitest';

describe(
  'AddContactUseCase Specification',
  async () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const validPassword = '123456';
    const validContactEmail = 'test@test.com';
    const validContactPhone = '999999999';
    const validContactName = 'Test Silva';
    const invalidUserId = '0';
    
    const repository = Infra.createRepository();
    const createUserUseCase = new CreateUserUseCase(repository);
    const user = await createUserUseCase.execute({ name: validName, email: validEmail, password: validPassword });

    const emails = [Email.create(validContactEmail)];
    const phones = [PhoneNumber.create(validContactPhone)];
    const contact = Contact.create(validContactName, emails, phones);
  
    const addContactUseCase = new AddContactUseCase(repository);
    const getContactsUseCase = new ListContactsUseCase(repository);

    test('Should add a contact to the user', async () => {

      await addContactUseCase.execute(user.id, contact);
      const expectedContacts = await getContactsUseCase.execute(user.id);
      expect(expectedContacts).toEqual([contact]);
    
    });

    test('Should throw an error', async () => {

      const expectation = expect(async () => { await addContactUseCase.execute(invalidUserId, contact); });
      await expectation.rejects.toThrowError(Errors.unexistentUserError);
    
    });
  
  }
);
