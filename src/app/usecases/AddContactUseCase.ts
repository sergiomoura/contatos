import { Contact } from '../entities/Contact';
import { Email } from '../entities/Email';
import { PhoneNumber } from '../entities/PhoneNumber';
import { type Repository } from '../repositories/Repository';

export class AddContactUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string, name: string, emailStrings: string[], phoneNumberStrings: string[]): Promise<Contact> {
    
    const emails = (emailStrings.map(Email.create));
    const phoneNumbers = phoneNumberStrings.map(PhoneNumber.create);
    const contact = Contact.create(name, emails, phoneNumbers);
    await this.repository.addContactToUser(userId, contact);
    return contact;
  
  }

}
