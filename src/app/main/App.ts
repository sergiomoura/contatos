import express, { Router, type Request as ExpressRequest, type Response as ExpressResponse } from 'express';

import { type Request } from '@/types/Request';
import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { settings } from '@/settings';

const router = Router();

const createUserRouterCallback = async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {

  const repository = settings.repository;
  const createUserUsecase = new CreateUserUseCase(repository);
  const createUserController = new CreateUserController(createUserUsecase);
  const headers: Record<string, string | string[] | undefined> = {};

  for (const key in req.headers) {

    headers[key] = req.headers[key];
      
  }
  
  const request: Request = {
    body: req.body,
    headers
  };

  const response = await createUserController.handle(request);
  res.status(response.status).json(response.body);

};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/auth/register', async (req, res) => { await createUserRouterCallback(req, res); });

const App = express();
App.use(express.json());
App.use('/api/v1', router);

export { App };
