import { type Contact } from '../entities/Contact';
import { type Email } from '../entities/Email';
import { type PhoneNumber } from '../entities/PhoneNumber';
// import { type PhoneNumber } from '../entities/PhoneNumber';
// import { type Contact } from '../entities/Contact';
import { type User } from '../entities/User';

export interface Repository {
  createUser: (name: string, email: string, password: string) => Promise<User>
  getUserByEmail: (email: string) => Promise<User | undefined>
  deleteUser: (id: string) => Promise<void>
  addContactToUser: (userId: string, contact: Contact) => Promise<void>
  getContactsByUser: (userId: string) => Promise<Contact[]>
  deleteContact: (contactId: string) => Promise<void>
  addEmailToContact: (contactId: string, email: Email) => Promise<void>
  addPhoneNumberToContact: (contactId: string, phoneNumber: PhoneNumber) => Promise<void>
  deleteEmail: (emailId: string) => Promise<void>
  deletePhoneNumber: (phoneId: string) => Promise<void>
  changeUserInfo: (userId: string, newName: string, newEmail: string, newPassword?: string) => Promise<User>
  // TODO: changeContactInfo: (contactId: string, name: string) => Promise<void>
  // TODO: changePhoneNumber: (phoneId: string, newPhone: string) => Promise<PhoneNumber>
  // TODO: changeEmail: (emailId: string, newEmail: string) => Promise<Email>
}
