import { Errors } from '@/errors/Errors';
import { type User } from '../entities/User';
import { type Repository } from '../repositories/Repository';

export class GetUserByEmailUseCase {

  constructor (private readonly repository: Repository) {}
  
  async execute (email: string): Promise<User> {

    const user = await this.repository.getUserByEmail(email);
    if (user === undefined) {

      throw Errors.unexistentUserError;
    
    }
    return user;
  
  }

}
