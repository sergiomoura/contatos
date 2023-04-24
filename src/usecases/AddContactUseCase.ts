import { UseCase } from '@/types/UseCase';
import { type ContactInDTO } from '@/dtos/Contact.indto';
import { Contact } from '@/entities/Contact';
import { Email } from '@/entities/Email';
import { PhoneNumber } from '@/entities/PhoneNumber';
import { type Repository } from '@/types/Repository';

export class AddContactUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userId: string, contactInDto: ContactInDTO): Promise<Contact> {

    const emails = (contactInDto.emails).map(emailDto => emailDto.address);
    const phoneNumbers = (contactInDto.phoneNumbers).map(phoneNumberDto => phoneNumberDto.number);
    const contact = Contact.create(contactInDto.name, emails.map(Email.create), phoneNumbers.map(PhoneNumber.create));
    await this.repository.addContactToUser(userId, contact);
    return contact;
  
  }

}
