import { FailedResponses } from '@/errors/FailedResponses';
import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';

import { type Response } from '@/types/Response';
import { type DeleteContactUseCase } from '../usecases/DeleteContactUseCase';

export default class DeleteContactController implements Controller {

  constructor (private readonly deleteContactUseCase: DeleteContactUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const contactId = request.params?.contactId;
    
    // TODO: Put this validation into a middleware  with other validations
    if (contactId === undefined) {
      
      return { status: 400 };
    
    }

    try {
      
      await this.deleteContactUseCase.execute(userId, contactId);
      return { status: 204 };

    } catch (error) {

      return FailedResponses.unexistentContact;
    
    }
    
  }

}
