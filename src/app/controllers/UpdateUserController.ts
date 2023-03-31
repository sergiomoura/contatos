import { type Controller } from '@/types/Controller';
import { type Response } from '@/types/Response';
import { FailedResponses } from '@/errors/FailedResponses';
import { Mappers } from '../mappers/Mappers';
import { type AuthenticatedRequest } from '@/types/AuthenticatedRequest';
import { type UserUpdateInDTO } from '../dtos/UserUpdate.indto';
import { type UpdateUserUseCase } from '../usecases/UpdateUserUseCase';

export class UpdateUserController implements Controller {

  constructor (private readonly updateUserUseCase: UpdateUserUseCase) {}
  async handle (request: AuthenticatedRequest): Promise<Response> {

    const userId = request.user.id;
    const data = (<Omit<UserUpdateInDTO, 'id'>>request.body);
    
    const userInDto: UserUpdateInDTO = Object.assign({}, { id: userId }, data);

    try {

      const user = await this.updateUserUseCase.execute(userInDto);
      const userDto = Mappers.getUserOutDto(user);

      const res: Response = {
        status: 200,
        body: { user: userDto }
      };

      return res;
    
    } catch (error) {

      // TODO: Check possible errors and return acceptable response
      return FailedResponses.userAlreadyExists;
    
    }
  
  }

}
