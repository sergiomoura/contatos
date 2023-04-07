import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';

import { type Response } from '@/types/Response';
import { type DeletePhoneNumberUseCase } from '@/usecases/DeletePhoneNumberUseCase';

export default class DeletePhoneNumberController implements Controller {

  constructor (private readonly deletePhoneNumberUseCase: DeletePhoneNumberUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const contactId = request.params?.contactId;
    const phoneId = request.params?.phoneId;
    
    // TODO: Put this validation into a middleware  with other validations
    if (contactId === undefined) {
      
      return { status: 400 };
    
    }
    if (phoneId === undefined) {
      
      return { status: 400 };
    
    }
    await this.deletePhoneNumberUseCase.execute(userId, contactId, phoneId);
    return { status: 200 };
    
  }

}
