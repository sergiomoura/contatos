import { describe, expect, test } from 'vitest';
import { Contact } from '@/app/entities/Contact';
import { Email } from '@/app/entities/Email';
import { PhoneNumber } from '@/app/entities/PhoneNumber';

describe(

  'Contact specifications',

  () => {

    const validName = 'Jonh Doe';
    const emails: Email[] = [
      Email.create('test1@email.com'),
      Email.create('test2@email.com')
    ];
    const phoneNumbers: PhoneNumber[] = [
      PhoneNumber.create('99999999'),
      PhoneNumber.create('99999999')
    ];
    
    test('Should create a valid contact without emails or phoneNumbers',
      () => {

        const contact = Contact.create(validName);
        expect(contact.name).toEqual(validName);
      
      }
    );

    test('Should create a valid contact with emails and phoneNumbers',
    
      () => {

        const contact = Contact.create(validName, emails, phoneNumbers);
        expect(contact.name).toEqual(validName);
        expect(contact.emails).toEqual(emails);
        expect(contact.phoneNumbers).toEqual(phoneNumbers);
      
      }

    );
  
  }

);
