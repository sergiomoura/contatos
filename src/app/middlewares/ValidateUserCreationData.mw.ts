import { Infra } from '@/Infra';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateUserDataSchema from '@/app/schemas/CreateUserData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';

export class ValidateUserCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const jsonValidator = Infra.createJsonValidator();
    
    const validationResult = jsonValidator.validate(CreateUserDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForUserCreation;

    }

    return request;

  }

}
