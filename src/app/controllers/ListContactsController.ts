import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { type ListContactsUseCase } from '../usecases/ListContactsUseCase';

export class ListContactsController implements Controller {

  constructor (private readonly getContactsUseCase: ListContactsUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const contacts = this.getContactsUseCase.execute(request.user.id);
    return <Response>{
      status: 200,
      body: contacts
    };
  
  }

}
