import { User } from '@/app/entities/User';
import { Errors } from '@/app/Errors';
import { type Repository } from '@/app/repositories/Repository';

export class MemoryRepository implements Repository {

  private readonly users: User[] = [];

  async createUser (name: string, email: string, password: string): Promise<User> {

    const user = User.create(name, email, password);
    this.users.push(user);
    return user;
  
  }

  async getUserByEmail (email: string): Promise<User | undefined> {

    const user = this.users.find(user => user.email === email);
    return user;
  
  }

  async deleteUser (id: string): Promise<void> {

    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) { throw new Error(Errors.unexistentUserError); }
    this.users.splice(index, 1);
  
  }

}
