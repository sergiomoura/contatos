import { Infra } from '@/Infra';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import CreateUserDataSchema from '@/app/schemas/CreateUserData.schema.json';

export class ValidateUserCreationData implements Middleware {

  async handle (request: Request): Promise<Request> {

    const jsonValidator = Infra.createJsonValidator();
    const validationResult = jsonValidator.validate(CreateUserDataSchema, request.body);
    if (!validationResult.isValid) {
    
      throw new Error('Bad request');

    }

    return request;

  }

}
