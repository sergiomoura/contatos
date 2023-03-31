import { Errors } from '@/errors/Errors';
import { type Repository } from '../repositories/Repository';

export class DeleteContactUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string, contactId: string): Promise<void> {

    const contacts = await this.repository.getContactsByUser(userId);
    if (contacts.findIndex(c => c.id === contactId) === -1) {

      throw Errors.unexistentContactError;
       
    }
    await this.repository.deleteContact(contactId);
  
  }

}
