import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { settings } from '@/settings';
import { type Router } from '@/types/Router';
import { HttpMethod } from '@/types/HttpMethod';

const repository = settings.repository;
const createUserUsecase = new CreateUserUseCase(repository);
const createUserController = new CreateUserController(createUserUsecase);

const router: Router = {
  middlewares: [],
  routes: [
    {
      uri: '/api/v1/auth/register',
      destiny: createUserController,
      method: HttpMethod.POST,
      middlewares: undefined
    }
  ]
};

const App = settings.webApp;
App.setRouter(router);
export { App };
