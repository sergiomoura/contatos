import { FailedResponses } from '@/errors/FailedResponses';
import { type Controller } from '@/types/Controller';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { Tokenizer } from '@/utils/Tokenizer';
import { Mappers } from '../mappers/Mappers';
import { type GetUserByEmailUseCase } from '../usecases/GetUserByEmailUseCase';
import { type VerifyUserUseCase } from '../usecases/VerifyUserUseCase';

interface LoginBody {
  email: string
  password: string
}

export class LoginController implements Controller {

  constructor (
    private readonly verifyUserUseCase: VerifyUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase
  ) {}

  async handle (request: Request): Promise<Response> {

    const { email, password } = <LoginBody>(request.body);
    const loginOk = await this.verifyUserUseCase.execute(email, password);
    
    if (!loginOk) {

      return FailedResponses.failedToLogin;
    
    }
    
    const user = await this.getUserByEmailUseCase.execute(email);
    const userDto = Mappers.getUserOutDto(user);

    const token = Tokenizer.create(userDto);
    return {
      status: 200,
      body: { user: userDto, token }
    };
  
  }

}
