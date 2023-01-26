import { type Contact } from '@/app/entities/Contact';
import { type Email } from '@/app/entities/Email';
import { type PhoneNumber } from '@/app/entities/PhoneNumber';
import { User } from '@/app/entities/User';
import { Errors } from '@/app/Errors';
import { type Repository } from '@/app/repositories/Repository';

class UserData {

  user: User;
  contacts: Contact[];

};

export class MemoryRepository implements Repository {

  private readonly users: UserData[] = [];

  async createUser (name: string, email: string, password: string): Promise<User> {

    const user = User.create(name, email, password);
    const userData = new UserData();
    userData.user = user;
    userData.contacts = [];
    this.users.push(userData);
    return user;
  
  }

  async getUserByEmail (email: string): Promise<User | undefined> {

    const userData = this.users.find(userData => userData.user.email === email);
    return userData?.user;
  
  }

  async deleteUser (id: string): Promise<void> {

    const index = this.users.findIndex(userData => userData.user.id === id);
    if (index === -1) { throw Errors.unexistentUserError; }
    this.users.splice(index, 1);
  
  }
  
  async addContactToUser (userId: string, contact: Contact): Promise<void> {

    const userData = this.users.find(userData => userData.user.id === userId);
    if (userData === undefined) { throw Errors.unexistentUserError; }
    userData.contacts.push(contact);
  
  }

  async getContactsByUser (userId: string): Promise<Contact[]> {

    const userData = this.users.find(userData => userData.user.id === userId);
    if (userData === undefined) { throw Errors.unexistentUserError; }
    return userData.contacts;
  
  }

  async deleteContact (contactId: string): Promise<void> {

    const userData = this.findContactOwner(contactId);
    if (userData === undefined) { throw Errors.unexistentContactError; }
    const index = userData.contacts.findIndex(contact => contact.id === contactId);
    userData.contacts.splice(index, 1);
  
  }

  async addEmailToContact (contactId: string, email: Email): Promise<void> {

    const contact = this.findContactById(contactId);
    if (contact === undefined) { throw Errors.unexistentContactError; }
    contact.emails.push(email);
  
  }

  async addPhoneNumberToContact (contactId: string, phoneNumber: PhoneNumber): Promise<void> {

    const contact = this.findContactById(contactId);
    if (contact === undefined) {

      throw Errors.unexistentContactError;
    
    }
    contact.phoneNumbers.push(phoneNumber);
  
  }

  async deleteEmail (emailId: string): Promise<void> {

    const contact = this.findEmailOwner(emailId);
    if (contact === undefined) { throw Errors.unexistentEmailError; }
    const index = contact.emails.findIndex(email => email.id === emailId);
    contact.emails.splice(index, 1);
  
  }

  async deletePhoneNumber (phoneId: string): Promise<void> {

    const contact = this.findPhoneNumberOwner(phoneId);
    if (contact === undefined) { throw Errors.unexistentPhoneError; }
    const index = contact.phoneNumbers.findIndex(phone => phone.id === phoneId);
    contact.phoneNumbers.splice(index, 1);
  
  }

  private findContactOwner (contactId: string): UserData | undefined {

    return this.users.find(
      userData => {

        const contact = userData.contacts.find(contact => contact.id === contactId);
        return contact !== undefined;
      
      }
    );
  
  }

  private findContactById (contactId: string): Contact | undefined {
    
    let searchedContact: Contact | undefined;

    this.users.find(
      userData => {

        searchedContact = userData.contacts.find(contact => contact.id === contactId);
        return searchedContact !== undefined;
      
      }
    );

    return searchedContact;
  
  }

  private findEmailOwner (emailId: string): Contact | undefined {

    for (const userData of this.users) {

      for (const contact of userData.contacts) {

        const email = contact.emails.find(email => email.id === emailId);
        if (email !== undefined) {

          return contact;
        
        }
      
      }
    
    }
  
  }

  private findPhoneNumberOwner (phoneId: string): Contact | undefined {

    for (const userData of this.users) {

      for (const contact of userData.contacts) {

        const phone = contact.phoneNumbers.find(phone => phone.id === phoneId);
        if (phone !== undefined) {

          return contact;
        
        }
      
      }
    
    }
  
  }

}
