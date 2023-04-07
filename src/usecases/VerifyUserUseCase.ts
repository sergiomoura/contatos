import { crypter } from '@/utils/Crypter';
import { type Repository } from '@/types/Repository';
import { UseCase } from '@/types/UseCase';

export class VerifyUserUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }
  
  async execute (email: string, password: string): Promise<boolean> {

    const user = await this.repository.getUserByEmail(email);
    if (user === undefined) {

      return false;
    
    }

    return crypter.compare(password, user.password);
  
  }

}
