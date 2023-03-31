import { Infra } from '@/Infra';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreatePhoneNumberDataSchema from '@/app/schemas/CreatePhoneNumberData.schema.json';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';

// TODO: Make a factory of incoming data validators
export class ValidatePhoneNumberCreationData implements Middleware {

  async handle (request: Request): Promise<Request | Response> {

    const jsonValidator = Infra.createJsonValidator();
    
    const validationResult = jsonValidator.validate(CreatePhoneNumberDataSchema, request.body);
    if (!validationResult.isValid) {

      return FailedResponses.invalidDataForPhoneNumberCreation;

    }

    return request;

  }

}
