import { type ContactOutDTO } from '../dtos/Contact.outdto';
import { type EmailOutDTO } from '../dtos/Email.outdto';
import { type PhoneNumberOutDTO } from '../dtos/PhoneNumber.outdto';
import { type UserOutDTO } from '../dtos/UserContact.outdto';
import { type Contact } from '../entities/Contact';
import { type Email } from '../entities/Email';
import { type PhoneNumber } from '../entities/PhoneNumber';
import { type User } from '../entities/User';

function getEmailOutDto (email: Email): EmailOutDTO {

  return {
    id: email.id,
    address: email.address
  };
    
}

function getPhoneNumberOutDto (phoneNumber: PhoneNumber): PhoneNumberOutDTO {

  return {
    id: phoneNumber.id,
    number: phoneNumber.number
  };
  
}

function getContactOutDto (contact: Contact): ContactOutDTO {

  return {
    id: contact.id,
    name: contact.name,
    emails: contact.emails.map(getEmailOutDto),
    phoneNumbers: contact.phoneNumbers.map(getPhoneNumberOutDto)
  };
  
}

function getUserOutDto (user: User): UserOutDTO {

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };

}

export const Mappers = { getEmailOutDto, getPhoneNumberOutDto, getContactOutDto, getUserOutDto };
