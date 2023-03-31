import { type Repository } from '@/app/repositories/Repository';
import { type User } from '@/app/entities/User';
import { crypter } from '@/utils/Crypter';
import { Errors } from '@/errors/Errors';
import { type UserInDTO } from '../dtos/UserContact.indto';

export class CreateUserUseCase {

  constructor (private readonly repository: Repository) {}

  async execute (userInDto: UserInDTO): Promise<User> {

    const user = await this.repository.getUserByEmail(userInDto.email);
    if (user !== undefined) { throw Errors.userAlreadyExistsError; }
    const encrypted = crypter.encrypt(userInDto.password);
    return await this.repository.createUser(userInDto.name, userInDto.email, encrypted);
    
  }

}
