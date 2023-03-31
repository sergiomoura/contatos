import { crypter } from '@/utils/Crypter';
import { type UserUpdateInDTO } from '../dtos/UserUpdate.indto';
import { type User } from '../entities/User';
import { type Repository } from '../repositories/Repository';

export class UpdateUserUseCase {

  constructor (private readonly repository: Repository) {}

  async execute (userData: UserUpdateInDTO): Promise<User> {

    const cryptedPassword = userData.password !== undefined ? crypter.encrypt(userData.password) : undefined;
    const user = await this.repository.changeUserInfo(userData.id, userData.name, userData.email, cryptedPassword);
    return user;

  }

}
