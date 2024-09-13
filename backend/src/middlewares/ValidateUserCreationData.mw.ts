import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateUserDataSchema from '@/schemas/CreateUserData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';
import jsonValidator from '@/utils/JsonValidator';

export class ValidateUserCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const validationResult = jsonValidator.validate(CreateUserDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForUserCreation;

    }

    return request;

  }

}
