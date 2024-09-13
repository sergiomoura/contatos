import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateContactDataSchema from '@/schemas/CreateContactData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';
import jsonValidator from '@/utils/JsonValidator';

export class ValidateContactCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const validationResult = jsonValidator.validate(CreateContactDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForContactCreation;

    }

    return request;

  }

}
