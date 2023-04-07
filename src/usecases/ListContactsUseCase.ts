import { UseCase } from '@/types/UseCase';
import { type Contact } from '@/entities/Contact';
import { type Repository } from '@/types/Repository';

export class ListContactsUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userId: string): Promise<Contact[]> {

    const contacts = await this.repository.getContactsByUser(userId);
    return contacts;
  
  }

}
