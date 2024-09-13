import { Errors } from '@/errors/Errors';
import { type User } from '@/entities/User';
import { type Repository } from '@/types/Repository';
import { UseCase } from '@/types/UseCase';

export class GetUserByEmailUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }
  
  async execute (email: string): Promise<User> {

    const user = await this.repository.getUserByEmail(email);
    if (user === undefined) {

      throw Errors.unexistentUserError;
    
    }
    return user;
  
  }

}
