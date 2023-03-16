import { type Contact } from '../entities/Contact';
import { type Repository } from '../repositories/Repository';

export class AddContactUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string, contact: Contact): Promise<void> {
   
    await this.repository.addContactToUser(userId, contact);
  
  }

}
