import { type Contact } from '@/app/entities/Contact';
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
    if (index === -1) { throw new Error(Errors.unexistentUserError); }
    this.users.splice(index, 1);
  
  }
  
  async addContactToUser (userId: string, contact: Contact): Promise<void> {

    const userData = this.users.find(userData => userData.user.id === userId);
    if (userData === undefined) { throw new Error(Errors.unexistentUserError); }
    userData.contacts.push(contact);
  
  }

  async getContactsByUser (userId: string): Promise<Contact[]> {

    const userData = this.users.find(userData => userData.user.id === userId);
    if (userData === undefined) { throw new Error(Errors.unexistentUserError); }
    return userData.contacts;
  
  }

  async deleteContact (contactId: string): Promise<void> {

    const userData = this.findContactOwner(contactId);
    if (userData === undefined) { throw new Error(Errors.unexistentContactError); }
    const index = userData.contacts.findIndex(contact => contact.id === contactId);
    userData.contacts.splice(index, 1);
  
  }

  private findContactOwner (contactId: string): UserData | undefined {

    return this.users.find(
      userData => {

        const contact = userData.contacts.find(contact => contact.id === contactId);
        return contact !== undefined;
      
      }
    );
  
  }

}
