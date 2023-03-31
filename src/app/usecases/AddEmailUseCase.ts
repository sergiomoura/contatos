import { Errors } from '@/errors/Errors';
import { Email } from '../entities/Email';
import { type Repository } from '../repositories/Repository';

export class AddEmailUseCase {

  constructor (private readonly repository: Repository) {}
  
  async execute (userId: string, contactId: string, emailString: string): Promise<Email> {

    const contacts = await this.repository.getContactsByUser(userId);
    const contact = contacts.find(c => c.id === contactId);
    if (contact === undefined) {

      throw Errors.unexistentContactError;
    
    }
    const email = Email.create(emailString);
    await this.repository.addEmailToContact(contactId, email);
    return email;
  
  }

}
