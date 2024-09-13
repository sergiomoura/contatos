import { Errors } from '@/errors/Errors';
import { type Repository } from '@/types/Repository';
import { UseCase } from '@/types/UseCase';

export class DeleteEmailUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userId: string, contactId: string, emailId: string): Promise<void> {

    const contacts = await this.repository.getContactsByUser(userId);
    const contact = contacts.find(c => c.id === contactId);
    if (contact === undefined) { throw Errors.unexistentContactError; }

    const emailIndex = contact.emails.findIndex(email => email.id === emailId);
    if (emailIndex === -1) { throw Errors.unexistentEmailError; }
    
    await this.repository.deleteEmail(emailId);
  
  }

}
