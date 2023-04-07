import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { Mappers } from '../mappers/Mappers';
import { type ListContactsUseCase } from '../usecases/ListContactsUseCase';

export default class ListContactsController implements Controller {

  constructor (private readonly getContactsUseCase: ListContactsUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const contacts = await this.getContactsUseCase.execute(request.user.id);
    return <Response>{
      status: 200,
      body: contacts.map(Mappers.getContactOutDto)
    };
  
  }

}
