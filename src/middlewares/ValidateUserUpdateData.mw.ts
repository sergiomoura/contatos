import { Infra } from '@/Infra';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import UpdateUserDataSchema from '@/app/schemas/UpdateUserData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';

export class ValidateUserUpdateData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const jsonValidator = Infra.createJsonValidator();
    
    const validationResult = jsonValidator.validate(UpdateUserDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForUserCreation;

    }

    return request;

  }

}
