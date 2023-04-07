import LoginController from '@/controllers/LoginController';
import { type User } from '@/entities/User';
import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';
import { GetUserByEmailUseCase } from '@/usecases/GetUserByEmailUseCase';
import { VerifyUserUseCase } from '@/usecases/VerifyUserUseCase';
import { FailedResponses } from '@/errors/FailedResponses';
import { type Request } from '@/types/Request';
import { Tokenizer } from '@/utils/Tokenizer';
import { describe, test, expect } from 'vitest';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';

describe(
  'LoginController Specification',
  async () => {

    const validName = 'Test';
    const validEmail = 'test@test.com';
    const validPassword = '123456';
    const invalidEmail = 'invalid@email.com';
    const invalidPassword = '654321';
    const repository = new MemoryRepository();
    const verifyUserUseCase = new VerifyUserUseCase(repository);
    const getUserByEmailUseCase = new GetUserByEmailUseCase(repository);
    const createUserUseCase = new CreateUserUseCase(repository);
    const loginController = new LoginController(verifyUserUseCase, getUserByEmailUseCase);
    const user = await createUserUseCase.execute({ name: validName, email: validEmail, password: validPassword });

    test('Should get a successful login', async () => {

      const loginRequest = <Request>{
        body: {
          email: validEmail,
          password: validPassword
        }
      };

      const response = await loginController.handle(loginRequest);
      expect(response.status).toEqual(200);
      
      const body = <{ user: Omit<User, 'password'>, token: string }>response.body;
      const expectedUserData = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      expect(body.user).toEqual(expectedUserData);

      expect(Tokenizer.validate(body.token)).toEqual(true);
      
    });

    test('Should get a failed login - wrong email', async () => {

      const loginRequest = <Request>{
        body: {
          email: invalidEmail,
          password: validPassword
        }
      };

      const response = await loginController.handle(loginRequest);
      expect(response.status).toEqual(FailedResponses.failedToLogin.status);
      
    });

    test('Should get a failed login - wrong password', async () => {

      const loginRequest = <Request>{
        body: {
          email: validEmail,
          password: invalidPassword
        }
      };

      const response = await loginController.handle(loginRequest);
      expect(response.status).toEqual(FailedResponses.failedToLogin.status);
      
    });
  
  }
);
