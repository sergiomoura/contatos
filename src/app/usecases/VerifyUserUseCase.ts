import { crypter } from '@/utils/Crypter';
import { type Repository } from '../repositories/Repository';

export class VerifyUserUseCase {

  constructor (private readonly repository: Repository) {}
  
  async execute (email: string, password: string): Promise<boolean> {

    const user = await this.repository.getUserByEmail(email);
    if (user === undefined) {

      return false;
    
    }

    return crypter.compare(password, user.password);
  
  }

}
