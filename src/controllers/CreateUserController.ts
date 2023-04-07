import { type Request } from '@/types/Request';
import { type Controller } from '@/types/Controller';
import { type CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';
import { Tokenizer } from '@/utils/Tokenizer';
import { Mappers } from '../mappers/Mappers';
import { type UserInDTO } from '../dtos/UserContact.indto';

export default class CreateUserController implements Controller {

  constructor (private readonly creatUserUseCase: CreateUserUseCase) {}
  async handle (request: Request): Promise<Response> {

    // TODO: validar corpo da requisição contra um schema para garantir os campos de usuário
    const userInDto = <UserInDTO>request.body;
    try {

      const user = await this.creatUserUseCase.execute(userInDto);
      const userDto = Mappers.getUserOutDto(user);

      const token = Tokenizer.create(userDto);
      
      const res: Response = {
        status: 201,
        body: { user: userDto, token }
      };

      return res;
    
    } catch (error) {

      return FailedResponses.userAlreadyExists;
    
    }
  
  }

}
