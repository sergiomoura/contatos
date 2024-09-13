import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { type ContactInDTO } from '@/dtos/Contact.indto';
import { Mappers } from '@/mappers/Mappers';
import { type AddContactUseCase } from '@/usecases/AddContactUseCase';

export default class AddContactController implements Controller {

  constructor (private readonly addContactsUseCase: AddContactUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const contactInDto = <ContactInDTO>request.body;

    const contact = await this.addContactsUseCase.execute(request.user.id, contactInDto);

    return <Response>{
      status: 200,
      body: Mappers.getContactOutDto(contact)
    };
  
  }

}
