import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { settings } from '@/settings';
import { HttpMethod } from '@/types/HttpMethod';
import { type Route } from '@/types/Route';

const repository = settings.repository;
const createUserUsecase = new CreateUserUseCase(repository);
const createUserController = new CreateUserController(createUserUsecase);

export const Routes: Route[] = [
  {
    path: '/api/v1/auth/register',
    handler:
      {
        controller: createUserController,
        method: HttpMethod.POST
      },
    middlewares: []
  }
];
