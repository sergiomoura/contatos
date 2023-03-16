import { type Contact } from '../entities/Contact';
import { type Repository } from '../repositories/Repository';

export class GetContactsUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string): Promise<Contact[]> {

    const contacts = await this.repository.getContactsByUser(userId);
    return contacts;
  
  }

}
