import { Errors } from '@/errors/Errors';
import { type Repository } from '../repositories/Repository';
import { UseCase } from '@/types/UseCase';

export class DeletePhoneNumberUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userId: string, contactId: string, phoneNumberId: string): Promise<void> {

    const contacts = await this.repository.getContactsByUser(userId);
    const contact = contacts.find(c => c.id === contactId);
    if (contact === undefined) { throw Errors.unexistentContactError; }

    const phoneNumberIndex = contact.phoneNumbers.findIndex(phone => phone.id === phoneNumberId);
    if (phoneNumberIndex === -1) { throw Errors.unexistentPhoneError; }
    
    await this.repository.deletePhoneNumber(phoneNumberId);
  
  }

}
