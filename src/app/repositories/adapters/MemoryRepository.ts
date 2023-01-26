import { User } from '@/app/entities/User';
import { type Repository } from '@/app/repositories/Repository';

export class MemoryRepository implements Repository {

  private readonly users: User[] = [];

  async createUser (name: string, email: string, password: string): Promise<User> {

    const user = User.create(name, email, password);
    this.users.push(user);
    return user;
  
  }

}
