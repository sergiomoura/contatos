import { type ContactInDTO } from '../dtos/Contact.indto';
import { Contact } from '../entities/Contact';
import { Email } from '../entities/Email';
import { PhoneNumber } from '../entities/PhoneNumber';
import { type Repository } from '../repositories/Repository';

export class AddContactUseCase {

  constructor (private readonly repository: Repository) {}
  async execute (userId: string, contactInDto: ContactInDTO): Promise<Contact> {
    
    const contact = Contact.create(contactInDto.name, contactInDto.emails.map(Email.create), contactInDto.phoneNumbers.map(PhoneNumber.create));
    await this.repository.addContactToUser(userId, contact);
    return contact;
  
  }

}
