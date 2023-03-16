import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { Infra } from '@/Infra';
import { HttpMethod } from '@/types/HttpMethod';
import { type Route } from '@/types/Route';
import { ValidateUserCreationData } from './middlewares/ValidateUserCreationData.mw';

const repository = Infra.createRepository();
const createUserUsecase = new CreateUserUseCase(repository);
const createUserController = new CreateUserController(createUserUsecase);

export const Routes: Route[] = [
  {
    path: '/api/v1/auth/register',
    controller: createUserController,
    method: HttpMethod.POST,
    middlewares: [new ValidateUserCreationData()]
  }
];
