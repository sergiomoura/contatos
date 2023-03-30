import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { type AddContactUseCase } from '../usecases/AddContactUseCase';

export class AddContactController implements Controller {

  constructor (private readonly addContactsUseCase: AddContactUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const name = (<{ name: string }>request.body).name;
    const emails = (<{ emails: string[] }>request.body).emails;
    const phoneNumbers = (<{ phoneNumbers: string[] }>request.body).phoneNumbers;

    const contact = await this.addContactsUseCase.execute(request.user.id, name, emails, phoneNumbers);
    
    return <Response>{
      status: 200,
      body: contact
    };
  
  }

}
