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
  basePath: '',
  routes: [
    {
      path: '/api/v1/auth/register',
      controller: createUserController,
      method: HttpMethod.POST,
      middlewares: []
    }
  ]
};

const App = settings.webApp;
App.setRouter(router);
export { App };
