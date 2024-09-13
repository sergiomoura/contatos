import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';

import { type Response } from '@/types/Response';
import { type DeleteEmailUseCase } from '@/usecases/DeleteEmailUseCase';

export default class DeleteEmailController implements Controller {

  constructor (private readonly deleteEmailUseCase: DeleteEmailUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const contactId = request.params?.contactId;
    const emailId = request.params?.emailId;
    
    // TODO: Put this validation into a middleware  with other validations
    if (contactId === undefined) {
      
      return { status: 400 };
    
    }
    if (emailId === undefined) {
      
      return { status: 400 };
    
    }
    await this.deleteEmailUseCase.execute(userId, contactId, emailId);
    return { status: 200 };
    
  }

}
