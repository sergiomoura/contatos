import { crypter } from '@/utils/Crypter';
import { type UserUpdateInDTO } from '../dtos/UserUpdate.indto';
import { type User } from '../entities/User';
import { type Repository } from '../repositories/Repository';
import { UseCase } from '@/types/UseCase';

export class UpdateUserUseCase extends UseCase {

  constructor (protected readonly repository: Repository) {

    super(repository);
  
  }

  async execute (userData: UserUpdateInDTO): Promise<User> {

    const cryptedPassword = userData.password !== undefined ? crypter.encrypt(userData.password) : undefined;
    const user = await this.repository.changeUserInfo(userData.id, userData.name, userData.email, cryptedPassword);
    return user;

  }

}
