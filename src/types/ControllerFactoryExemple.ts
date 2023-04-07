import { type Repository } from '@/repositories/Repository';
import { type UserInDTO } from '@/dtos/UserContact.indto';
import { type User } from '@/entities/User';
import { Errors } from '@/errors/Errors';
import { crypter } from '@/utils/Crypter';
import { type Controller } from './Controller';
import { type Request } from '@/types/Request';
import { type Response } from '@/types/Response';
import { Mappers } from '@/mappers/Mappers';
import { Tokenizer } from '@/utils/Tokenizer';
import { FailedResponses } from '@/errors/FailedResponses';
import { Infra } from '@/Infra';

abstract class UseCase {

  constructor (protected readonly repository: Repository) {}
  abstract execute (...args: any[]): any;

}

class CreateUserUseCase extends UseCase {
  
  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userInDto: UserInDTO): Promise<User> {

    const user = await this.repository.getUserByEmail(userInDto.email);
    if (user !== undefined) { throw Errors.userAlreadyExistsError; }
    const encrypted = crypter.encrypt(userInDto.password);
    return await this.repository.createUser(userInDto.name, userInDto.email, encrypted);
    
  }

}

class CreateUserController implements Controller {

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

function buildController <T extends Controller, U extends UseCase> (
  ControllerConstructorInstance: new(useCase: UseCase) => T,
  UseCaseConstructorInstance: new (repository) => U,
  repository: Repository): T {
  
  const useCaseConstructor = new UseCaseConstructorInstance(repository);
  return new ControllerConstructorInstance(useCaseConstructor);

}

const repo = Infra.createRepository();
const createUserController = buildController(CreateUserController, CreateUserUseCase, repo);

console.log(createUserController);
