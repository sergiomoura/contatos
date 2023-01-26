import { User } from '@/app/entities/User';
import { MemoryRepository } from '@/app/repositories/adapters/MemoryRepository';
import { type Repository } from '@/app/repositories/Repository';
import { beforeEach, describe, expect, test } from 'vitest';

describe(

  'MemoryRepository specifications',
  () => {
    
    let repository: Repository;
    const validUserName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const hashedPassword = 'hashedPassword';
    let user: User;

    beforeEach(
      async () => {

        repository = new MemoryRepository();
        user = await repository.createUser(validUserName, validEmail, hashedPassword);
      
      }
    );

    test(
      'Should create a user',
      async () => {

        expect(user).toBeInstanceOf(User);
        expect(user.name).toEqual(validUserName);
        expect(user.email).toEqual(validEmail);
        expect(user.password).toEqual(hashedPassword);
      
      }
    );
  
  }
);
