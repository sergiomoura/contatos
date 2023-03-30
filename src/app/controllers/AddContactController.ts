import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { Contact } from '../entities/Contact';
import { Email } from '../entities/Email';
import { PhoneNumber } from '../entities/PhoneNumber';
import { type AddContactUseCase } from '../usecases/AddContactUseCase';

export class AddContactController implements Controller {

  constructor (private readonly addContactsUseCase: AddContactUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const name = (<{ name: string }>request.body).name;
    const emails = (<{ emails: string[] }>request.body).emails.map(Email.create);
    const phoneNumbers = (<{ phoneNumbers: string[] }>request.body).phoneNumbers.map(PhoneNumber.create);

    const contact = Contact.create(name, emails, phoneNumbers);
    await this.addContactsUseCase.execute(request.user.id, contact);
    
    return <Response>{
      status: 200,
      body: contact
    };
  
  }

}
