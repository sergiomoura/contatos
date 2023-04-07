import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';
import { VerifyUserUseCase } from '@/usecases/VerifyUserUseCase';
import { Infra } from '@/Infra';
import { describe, expect, test } from 'vitest';

describe(

  'VerifyUserUseCase specifications',

  async () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const validPassword = '123456';
    const invalidEmail = 'email@invalid.com';
    const invalidPassword = '654321';

    const repository = Infra.createRepository();
    const createUserUseCase = new CreateUserUseCase(repository);
    const verifyUserUseCase = new VerifyUserUseCase(repository);

    await createUserUseCase.execute({ name: validName, email: validEmail, password: validPassword });
    
    test('User should be verified', async () => {

      const verification = await verifyUserUseCase.execute(validEmail, validPassword);
      expect(verification).toBe(true);
    
    });

    test('User should not be verified - wrong password', async () => {

      const verification = await verifyUserUseCase.execute(validEmail, invalidPassword);
      expect(verification).toBe(false);
    
    });

    test('User should not be verified - wrong email', async () => {

      const verification = await verifyUserUseCase.execute(invalidEmail, validPassword);
      expect(verification).toBe(false);
    
    });
  
  }
);
