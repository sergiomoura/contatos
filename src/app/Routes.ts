import { CreateUserController } from '@/app/controllers/CreateUserController';
import { CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { Infra } from '@/Infra';
import { HttpMethod } from '@/types/HttpMethod';
import { type Route } from '@/types/Route';
import { ListContactsController } from './controllers/ListContactsController';
import { LoginController } from './controllers/LoginController';
import { CheckRequestAuthentication } from './middlewares/CheckRequestAuthentication.mw';
import { ValidateUserCreationData } from './middlewares/ValidateUserCreationData.mw';
import { ListContactsUseCase } from './usecases/ListContactsUseCase';
import { GetUserByEmailUseCase } from './usecases/GetUserByEmailUseCase';
import { VerifyUserUseCase } from './usecases/VerifyUserUseCase';
import { AddContactController } from './controllers/AddContactController';
import { AddContactUseCase } from './usecases/AddContactUseCase';
import { ValidateContactCreationData } from './middlewares/ValidateContactCreationData.mw';
import { DeleteContactController } from './controllers/DeleteContactController';
import { DeleteContactUseCase } from './usecases/DeleteContactUseCase';
import { ValidateEmailCreationData } from './middlewares/ValidateEmailCreationData.mw';
import { AddEmailController } from './controllers/AddEmailController';
import { AddEmailUseCase } from './usecases/AddEmailUseCase';
import { DeleteEmailUseCase } from './usecases/DeleteEmailUseCase';
import { DeleteEmailController } from './controllers/DeleteEmailController';
import { AddPhoneNumberController } from './controllers/AddPhoneNumberController';
import { AddPhoneNumberUseCase } from './usecases/AddPhoneNumberUseCase';
import { ValidatePhoneNumberCreationData } from './middlewares/ValidatePhoneNumberCreationData.mw';
import { DeletePhoneNumberController } from './controllers/DeletePhoneNumberController';
import { DeletePhoneNumberUseCase } from './usecases/DeletePhoneNumberUseCase';
import { UpdateUserController } from './controllers/UpdateUserController';
import { UpdateUserUseCase } from './usecases/UpdateUserUseCase';
import { ValidateUserUpdateData } from './middlewares/ValidateUserUpdateData.mw';
import { GetOpenApiSpecController } from './controllers/GetOpenApiSpec';

const repository = Infra.createRepository();
const createUserUsecase = new CreateUserUseCase(repository);
const createUserController = new CreateUserController(createUserUsecase);
const loginUserController = new LoginController(new VerifyUserUseCase(repository), new GetUserByEmailUseCase(repository));
const getContactsController = new ListContactsController(new ListContactsUseCase(repository));
const addContactController = new AddContactController(new AddContactUseCase(repository));
const deleteContactController = new DeleteContactController(new DeleteContactUseCase(repository));
const addEmailController = new AddEmailController(new AddEmailUseCase(repository));
const deleteEmailController = new DeleteEmailController(new DeleteEmailUseCase(repository));
const addPhoneNumberController = new AddPhoneNumberController(new AddPhoneNumberUseCase(repository));
const deletePhoneNumberController = new DeletePhoneNumberController(new DeletePhoneNumberUseCase(repository));
const updateUserController = new UpdateUserController(new UpdateUserUseCase(repository));
const getOpenApiSpecController = new GetOpenApiSpecController();

export const Routes: Route[] = [
  {
    path: '/api/v1/docs',
    controller: getOpenApiSpecController,
    method: HttpMethod.GET,
    middlewares: []
  },
  {
    path: '/api/v1/auth/register',
    controller: createUserController,
    method: HttpMethod.POST,
    middlewares: [new ValidateUserCreationData()]
  },
  {
    path: '/api/v1/auth/login',
    controller: loginUserController,
    method: HttpMethod.POST,
    middlewares: []
  },
  {
    path: '/api/v1/profile',
    controller: updateUserController,
    method: HttpMethod.PUT,
    middlewares: [new CheckRequestAuthentication(), new ValidateUserUpdateData()]
  },
  {
    path: '/api/v1/contacts',
    controller: getContactsController,
    method: HttpMethod.GET,
    middlewares: [new CheckRequestAuthentication()]
  },
  {
    path: '/api/v1/contacts',
    controller: addContactController,
    method: HttpMethod.POST,
    middlewares: [new CheckRequestAuthentication(), new ValidateContactCreationData()]
  },
  {
    path: '/api/v1/contacts/:contactId',
    controller: deleteContactController,
    method: HttpMethod.DELETE,
    middlewares: [new CheckRequestAuthentication()]
  },
  {
    path: '/api/v1/contacts/:contactId/emails',
    controller: addEmailController,
    method: HttpMethod.POST,
    middlewares: [new CheckRequestAuthentication(), new ValidateEmailCreationData()]
  },
  {
    path: '/api/v1/contacts/:contactId/emails/:emailId',
    controller: deleteEmailController,
    method: HttpMethod.DELETE,
    middlewares: [new CheckRequestAuthentication()]
  },
  {
    path: '/api/v1/contacts/:contactId/phones',
    controller: addPhoneNumberController,
    method: HttpMethod.POST,
    middlewares: [new CheckRequestAuthentication(), new ValidatePhoneNumberCreationData()]
  },
  {
    path: '/api/v1/contacts/:contactId/phones/:phoneId',
    controller: deletePhoneNumberController,
    method: HttpMethod.DELETE,
    middlewares: [new CheckRequestAuthentication()]
  }
];
