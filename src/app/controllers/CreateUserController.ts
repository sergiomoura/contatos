import { type Request } from '@/types/Request';
import { type Controller } from '@/types/Controller';
import { type CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { type Response } from '@/types/Response';
import { type User } from '../entities/User';
import { FailedResponses } from '@/errors/FailedResponses';

interface CreateUserBody {
  name: string
  email: string
  password: string
}

export class CreateUserController implements Controller {

  constructor (private readonly creatUserUseCase: CreateUserUseCase) {}
  async handle (request: Request): Promise<Response> {

    // TODO: validar corpo da requisição contra um schema para garantir os campos de usuário
    const { name, email, password } = <CreateUserBody>request.body;
    try {

      const user = await this.creatUserUseCase.execute(name, email, password);
      const userWithoutPassword: Omit<User, 'password'> = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      
      const res: Response = {
        status: 201,
        body: userWithoutPassword
      };

      return res;
    
    } catch (error) {

      return FailedResponses.userAlreadyExists;
    
    }
  
  }

}
