import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { type EmailInDTO } from '@/dtos/Email.indto';
import { Mappers } from '@/mappers/Mappers';
import { type AddEmailUseCase } from '@/usecases/AddEmailUseCase';

export default class AddEmailController implements Controller {

  constructor (private readonly addEmailUseCase: AddEmailUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const address = (<EmailInDTO>request.body).address;
    const contactId = (<{ contactId: string }>request.params).contactId;
    const email = await this.addEmailUseCase.execute(userId, contactId, address);
    return <Response>{
      status: 200,
      body: Mappers.getEmailOutDto(email)
    };
  
  }

}
