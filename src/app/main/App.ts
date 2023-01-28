import { type Request } from '@/utils/Request/Request';
import express, { Router, type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { MemoryRepository } from '../repositories/adapters/MemoryRepository';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';

const router = Router();

const createUserRouterCallback = async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {

  const repository = new MemoryRepository();
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
App.use('/api', router);

export { App };
