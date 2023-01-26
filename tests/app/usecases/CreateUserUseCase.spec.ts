import { User } from '@/app/entities/User';
import { Errors } from '@/app/Errors';
import { MemoryRepository } from '@/app/repositories/adapters/MemoryRepository';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { crypter } from '@/utils/Crypter';
import { describe, expect, test } from 'vitest';

describe(
  
  'CreateUserUseCase specifications',

  () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const validPassword = '123456';
    
    const repository = new MemoryRepository();
    const createUserUseCase = new CreateUserUseCase(repository);

    test('Should create a user',
      async () => {

        const user = await createUserUseCase.execute(validName, validEmail, validPassword);
        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validName);
        expect(user.email).toEqual(validEmail);
        expect(crypter.compare(validPassword, user.password)).toEqual(true);
      
      }
    );

    test('Should throw an error trying to create an already register user',
      async () => {

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const tryToCreate = async () => { await createUserUseCase.execute(validName, validEmail, validPassword); };
        await expect(tryToCreate).rejects.toThrowError(Errors.userAlreadyExistsError);
      
      }
    );

  }
);
