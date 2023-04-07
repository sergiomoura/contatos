import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { type PhoneNumberInDTO } from '../dtos/PhoneNumber.indto';
import { Mappers } from '../mappers/Mappers';
import { type AddPhoneNumberUseCase } from '../usecases/AddPhoneNumberUseCase';

export default class AddPhoneNumberController implements Controller {

  constructor (private readonly addPhoneNumberUseCase: AddPhoneNumberUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const number = (<PhoneNumberInDTO>request.body).number;
    const contactId = (<{ contactId: string }>request.params).contactId;
    const phoneNumber = await this.addPhoneNumberUseCase.execute(userId, contactId, number);
    return <Response>{
      status: 200,
      body: Mappers.getPhoneNumberOutDto(phoneNumber)
    };
  
  }

}
