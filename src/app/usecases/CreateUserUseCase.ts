import { type Repository } from '@/app/repositories/Repository';
import { type User } from '../entities/User';
import { crypter } from '@/utils/Crypter';
import { Errors } from '../Errors';

export class CreateUserUseCase {

  constructor (private readonly repository: Repository) {}

  async execute (name: string, email: string, password: string): Promise<User> {

    const user = await this.repository.getUserByEmail(email);
    if (user !== undefined) { throw Errors.userAlreadyExistsError; }
    const encrypted = crypter.encrypt(password);
    return await this.repository.createUser(name, email, encrypted);
    
  }

}
