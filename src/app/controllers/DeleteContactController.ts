import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type Controller } from '@/types/Controller';

import { type Response } from '@/types/Response';
import { type DeleteContactUseCase } from '../usecases/DeleteContactUseCase';

export class DeleteContactController implements Controller {

  constructor (private readonly deleteContactUseCase: DeleteContactUseCase) {}

  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const contactId = request.params?.contactId;
    
    // TODO: Put this validation into a middleware  with other validations
    console.log(request.params);
    if (contactId === undefined) {
      
      return { status: 400 };
    
    }
    await this.deleteContactUseCase.execute(userId, contactId);
    return { status: 200 };
    
  }

}
