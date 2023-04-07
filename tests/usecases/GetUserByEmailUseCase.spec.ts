import { GetUserByEmailUseCase } from '@/usecases/GetUserByEmailUseCase';
import { Errors } from '@/errors/Errors';
import { describe, test, expect } from 'vitest';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';

describe(
  'GetUserByEmail Specifications',
  async () => {

    const validName = 'Test';
    const validEmail = 'test@test.com';
    const validPassword = '123456';
    const invalidEmail = 'invalid@email.com';

    const repository = new MemoryRepository();

    const expectedUser = await repository.createUser(validName, validEmail, validPassword);
    const getUserByEmail = new GetUserByEmailUseCase(repository);
    
    test('Should get user', async () => {
      
      const user = await getUserByEmail.execute(validEmail);
      expect(user).toEqual(expectedUser);
    
    });

    test('Should throw an "unexistentUser" error', async () => {

      const expectation = expect(async () => { await getUserByEmail.execute(invalidEmail); });
      await expectation.rejects.toThrowError(Errors.unexistentUserError);
    
    });
  
  }
);
