import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateEmailDataSchema from '@/schemas/CreateEmailData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';
import jsonValidator from '@/utils/JsonValidator';

// TODO: Make a factory of incoming data validators
export class ValidateEmailCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const validationResult = jsonValidator.validate(CreateEmailDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForEmailCreation;

    }

    return request;

  }

}
