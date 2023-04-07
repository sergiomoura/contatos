import { type Repository } from '@/types/Repository';
import { type User } from '@/entities/User';
import { crypter } from '@/utils/Crypter';
import { Errors } from '@/errors/Errors';
import { type UserInDTO } from '@/dtos/UserContact.indto';
import { UseCase } from '@/types/UseCase';

export class CreateUserUseCase extends UseCase {

  constructor (protected readonly repository: Repository) { super(repository); }

  async execute (userInDto: UserInDTO): Promise<User> {

    const user = await this.repository.getUserByEmail(userInDto.email);
    if (user !== undefined) { throw Errors.userAlreadyExistsError; }
    const encrypted = crypter.encrypt(userInDto.password);
    return await this.repository.createUser(userInDto.name, userInDto.email, encrypted);
    
  }

}
