import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { Infra } from '@/Infra';
import { HttpMethod } from '@/types/HttpMethod';
import { type Route } from '@/types/Route';
import { LoginController } from './controllers/LoginController';
import { ValidateUserCreationData } from './middlewares/ValidateUserCreationData.mw';
import { GetUserByEmailUseCase } from './usecases/GetUserByEmailUseCase';
import { VerifyUserUseCase } from './usecases/VerifyUserUseCase';

const repository = Infra.createRepository();
const createUserUsecase = new CreateUserUseCase(repository);
const createUserController = new CreateUserController(createUserUsecase);
const loginUserController = new LoginController(new VerifyUserUseCase(repository), new GetUserByEmailUseCase(repository));

export const Routes: Route[] = [
  {
    path: '/api/v1/auth/register',
    controller: createUserController,
    method: HttpMethod.POST,
    middlewares: [new ValidateUserCreationData()]
  },
  {
    path: '/api/v1/auth/login',
    controller: loginUserController,
    method: HttpMethod.POST,
    middlewares: []
  }
];
