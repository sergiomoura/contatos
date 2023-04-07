import { App } from '@/app/App';
import { Infra } from './Infra';
import { type Route } from './types/Route';
import { RoutesFactory } from './app/RoutesFactory';
import { HttpMethod } from './types/HttpMethod';
import { MemoryRepository } from './app/repositories/adapters/MemoryRepository';

import GetOpenApiSpecController from './app/controllers/GetOpenApiSpec';
import CreateUserController from './app/controllers/CreateUserController';
import LoginController from './app/controllers/LoginController';
import UpdateUserController from './app/controllers/UpdateUserController';
import ListContactsController from './app/controllers/ListContactsController';
import AddContactController from './app/controllers/AddContactController';
import DeleteContactController from './app/controllers/DeleteContactController';
import AddEmailController from './app/controllers/AddEmailController';
import DeleteEmailController from './app/controllers/DeleteEmailController';
import AddPhoneNumberController from './app/controllers/AddPhoneNumberController';
import DeletePhoneNumberController from './app/controllers/DeletePhoneNumberController';

import { ValidateUserCreationData } from './app/middlewares/ValidateUserCreationData.mw';
import { CheckRequestAuthentication } from './app/middlewares/CheckRequestAuthentication.mw';
import { ValidateUserUpdateData } from './app/middlewares/ValidateUserUpdateData.mw';
import { ValidateContactCreationData } from './app/middlewares/ValidateContactCreationData.mw';
import { ValidateEmailCreationData } from './app/middlewares/ValidateEmailCreationData.mw';
import { ValidatePhoneNumberCreationData } from './app/middlewares/ValidatePhoneNumberCreationData.mw';

import { CreateUserUseCase } from './app/usecases/CreateUserUseCase';
import { VerifyUserUseCase } from './app/usecases/VerifyUserUseCase';
import { GetUserByEmailUseCase } from './app/usecases/GetUserByEmailUseCase';
import { UpdateUserUseCase } from './app/usecases/UpdateUserUseCase';
import { ListContactsUseCase } from './app/usecases/ListContactsUseCase';
import { AddContactUseCase } from './app/usecases/AddContactUseCase';
import { DeleteContactUseCase } from './app/usecases/DeleteContactUseCase';
import { AddEmailUseCase } from './app/usecases/AddEmailUseCase';
import { DeleteEmailUseCase } from './app/usecases/DeleteEmailUseCase';
import { AddPhoneNumberUseCase } from './app/usecases/AddPhoneNumberUseCase';
import { DeletePhoneNumberUseCase } from './app/usecases/DeletePhoneNumberUseCase';

const repository = new MemoryRepository();
const routesFactory = new RoutesFactory(repository);

const routes: Route[] = [
  routesFactory.build(HttpMethod.GET, '/api/v1/docs', GetOpenApiSpecController),
  routesFactory.build(HttpMethod.POST, '/api/v1/auth/register', CreateUserController, [ValidateUserCreationData], [CreateUserUseCase]),
  routesFactory.build(HttpMethod.POST, '/api/v1/auth/login', LoginController, [], [VerifyUserUseCase, GetUserByEmailUseCase]),
  routesFactory.build(HttpMethod.PUT, '/api/v1/profile', UpdateUserController, [CheckRequestAuthentication, ValidateUserUpdateData], [UpdateUserUseCase]),
  routesFactory.build(HttpMethod.GET, '/api/v1/contacts', ListContactsController, [CheckRequestAuthentication], [ListContactsUseCase]),
  routesFactory.build(HttpMethod.POST, '/api/v1/contacts', AddContactController, [CheckRequestAuthentication, ValidateContactCreationData], [AddContactUseCase]),
  routesFactory.build(HttpMethod.DELETE, '/api/v1/contacts/:contactId', DeleteContactController, [CheckRequestAuthentication], [DeleteContactUseCase]),
  routesFactory.build(HttpMethod.POST, '/api/v1/contacts/:contactId/emails', AddEmailController, [CheckRequestAuthentication, ValidateEmailCreationData], [AddEmailUseCase]),
  routesFactory.build(HttpMethod.DELETE, '/api/v1/contacts/:contactId/emails/:emailId', DeleteEmailController, [CheckRequestAuthentication], [DeleteEmailUseCase]),
  routesFactory.build(HttpMethod.POST, '/api/v1/contacts/:contactId/phones', AddPhoneNumberController, [CheckRequestAuthentication, ValidatePhoneNumberCreationData], [AddPhoneNumberUseCase]),
  routesFactory.build(HttpMethod.DELETE, '/api/v1/contacts/:contactId/phones/:phoneId', DeletePhoneNumberController, [CheckRequestAuthentication], [DeletePhoneNumberUseCase])

];

App.setRoutes(routes);
App.listen(Infra.getPort());
