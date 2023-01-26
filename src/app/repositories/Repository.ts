// import { type Contact } from '../entities/Contact';
// import { type Email } from '../entities/Email';
// import { type PhoneNumber } from '../entities/PhoneNumber';
import { type User } from '../entities/User';

export interface Repository {
  createUser: (name: string, email: string, password: string) => Promise<User>
  getUserByEmail: (email: string) => Promise<User | undefined>
  // TODO: deleteUser: (id: string) => Promise<void>
  // TODO: getContactsByUser: (userId: string) => Promise<Contact[]>
  // TODO: changeUserInfo: (userId: string, newName: string, newEmail: string, newPassword?: string) => Promise<User>
  // TODO: addContactToUser: (userId: string, contactName: string, emails?: Email[], phoneNumbers?: PhoneNumber[]) => Promise<Contact>
  // TODO: addPhoneToContact: (contactId: string, phoneNumber: string) => Promise<PhoneNumber>
  // TODO: addEmailToContact: (contactId: string, email: string) => Promise<Email>
  // TODO: changeContactInfo: (contactId: string, name: string) => Promise<void>
  // TODO: changePhoneNumber: (phoneId: string, newPhone: string) => Promise<PhoneNumber>
  // TODO: changeEmail: (emailId: string, newEmail: string) => Promise<Email>
  // TODO: deleteContact: (contactId: string) => Promise<void>
  // TODO: deletePhoneNumber: (phoneId: string) => Promise<void>
  // TODO: deleteEmail: (emailId: string) => Promise<void>
}
