import { FailedResponses } from '@/errors/FailedResponses';
import { type Controller } from '@/types/Controller';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { tokenGenerator } from '@/utils/TokenGenerator';
import { type User } from '../entities/User';
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
    const userData: Omit<User, 'password'> = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const token = tokenGenerator.create(userData);
    return {
      status: 200,
      body: { user: userData, token }
    };
  
  }

}
