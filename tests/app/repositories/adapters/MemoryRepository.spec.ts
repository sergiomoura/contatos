import { User } from '@/app/entities/User';
import { Errors } from '@/app/Errors';
import { MemoryRepository } from '@/app/repositories/adapters/MemoryRepository';
import { type Repository } from '@/app/repositories/Repository';
import { beforeEach, describe, expect, test } from 'vitest';

describe(

  'MemoryRepository specifications',
  () => {
    
    let repository: Repository;
    const validUserName = 'Jonh Doe';
    const validUserEmail = 'jonhdoe@test.com';
    const unexistentUserEmail = 'nobody@test.com';
    const unexistentUserId = '000000';
    const hashedPassword = 'hashedPassword';
    let user: User;

    beforeEach(
      async () => {

        repository = new MemoryRepository();
        user = await repository.createUser(validUserName, validUserEmail, hashedPassword);
      
      }
    );

    test(
      'Should create a user',
      async () => {

        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validUserName);
        expect(user.email).toEqual(validUserEmail);
        expect(user.password).toEqual(hashedPassword);
      
      }
    );

    test(
      'Should recover user by its email',
      async () => {

        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeInstanceOf(User);
        expect(loadedUser).toEqual(user);
      
      }
    );

    test(
      'Should return undefined when trying to get user by unexisting email',
      async () => {

        const loadedUser = await repository.getUserByEmail(unexistentUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );

    test(
      'Should throw an exception trying to delete unexistent user',
      async () => {

        const assertion = expect(async () => { await repository.deleteUser(unexistentUserId); });
        await assertion.rejects.toThrow(Errors.unexistentUserError);
      
      }
    );
    
    test(
      'Should delete user form repository',
      async () => {

        await repository.deleteUser(user.id);
        const loadedUser = await repository.getUserByEmail(validUserEmail);
        expect(loadedUser).toBeUndefined();
      
      }
    );
  
  }
);
