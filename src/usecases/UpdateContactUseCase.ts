import { UseCase } from '@/types/UseCase';
import { type ContactInDTO } from '@/dtos/Contact.indto';
import { Contact } from '@/entities/Contact';
import { Email } from '@/entities/Email';
import { PhoneNumber } from '@/entities/PhoneNumber';
import { type Repository } from '@/types/Repository';

export class UpdateContactUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (contactId: string, contactInDto: ContactInDTO): Promise<Contact> {

    const emails = (contactInDto.emails).map(emailDto => emailDto.address);
    const phoneNumbers = (contactInDto.phoneNumbers).map(phoneNumberDto => phoneNumberDto.number);
    const contact = Contact.create(contactInDto.name, emails.map(Email.create), phoneNumbers.map(PhoneNumber.create), contactId);
    const updatedContact = await this.repository.updateContact(contact);
    return updatedContact;
  
  }

}
