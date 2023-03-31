import { Errors } from '@/errors/Errors';
import { PhoneNumber } from '../entities/PhoneNumber';
import { type Repository } from '../repositories/Repository';

export class AddPhoneNumberUseCase {

  constructor (private readonly repository: Repository) {}
  
  async execute (userId: string, contactId: string, number: string): Promise<PhoneNumber> {

    const contacts = await this.repository.getContactsByUser(userId);
    const contact = contacts.find(c => c.id === contactId);
    if (contact === undefined) {

      throw Errors.unexistentContactError;
    
    }
    const phoneNumber = PhoneNumber.create(number);
    await this.repository.addPhoneNumberToContact(contactId, phoneNumber);
    return phoneNumber;
  
  }

}
