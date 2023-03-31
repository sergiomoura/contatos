import { type Repository } from '../repositories/Repository';

export class DeleteContactUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string, contactId: string): Promise<void> {
    
    await this.repository.deleteContact(contactId);
  
  }

}
