import { Infra } from '@/Infra';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateContactDataSchema from '@/app/schemas/CreateContactData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';

export class ValidateContactCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const jsonValidator = Infra.createJsonValidator();
    
    const validationResult = jsonValidator.validate(CreateContactDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForContactCreation;

    }

    return request;

  }

}
