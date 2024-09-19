import { ExpressWebApp } from '@/adapters/ExpressWebApp/ExpressWebApp';

import { Infra } from '@/Infra';
import { RoutesFactory } from '@/routesFactory/RoutesFactory';
import { HttpMethod } from '@/types/HttpMethod';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';

import GetOpenApiSpecController from '@/controllers/GetOpenApiSpecController';
import CreateUserController from '@/controllers/CreateUserController';
import LoginController from '@/controllers/LoginController';
import UpdateUserController from '@/controllers/UpdateUserController';
import ListContactsController from '@/controllers/ListContactsController';
import AddContactController from '@/controllers/AddContactController';
import DeleteContactController from '@/controllers/DeleteContactController';
import AddEmailController from '@/controllers/AddEmailController';
import DeleteEmailController from '@/controllers/DeleteEmailController';
import AddPhoneNumberController from '@/controllers/AddPhoneNumberController';
import DeletePhoneNumberController from '@/controllers/DeletePhoneNumberController';

import { ValidateUserCreationData } from '@/middlewares/ValidateUserCreationData.mw';
import { CheckRequestAuthentication } from '@/middlewares/CheckRequestAuthentication.mw';
import { ValidateUserUpdateData } from '@/middlewares/ValidateUserUpdateData.mw';
import { ValidateContactCreationData } from '@/middlewares/ValidateContactCreationData.mw';
import { ValidateEmailCreationData } from '@/middlewares/ValidateEmailCreationData.mw';
import { ValidatePhoneNumberCreationData } from '@/middlewares/ValidatePhoneNumberCreationData.mw';

import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';
import { VerifyUserUseCase } from '@/usecases/VerifyUserUseCase';
import { GetUserByEmailUseCase } from '@/usecases/GetUserByEmailUseCase';
import { UpdateUserUseCase } from '@/usecases/UpdateUserUseCase';
import { ListContactsUseCase } from '@/usecases/ListContactsUseCase';
import { AddContactUseCase } from '@/usecases/AddContactUseCase';
import { DeleteContactUseCase } from '@/usecases/DeleteContactUseCase';
import { AddEmailUseCase } from '@/usecases/AddEmailUseCase';
import { DeleteEmailUseCase } from '@/usecases/DeleteEmailUseCase';
import { AddPhoneNumberUseCase } from '@/usecases/AddPhoneNumberUseCase';
import { DeletePhoneNumberUseCase } from '@/usecases/DeletePhoneNumberUseCase';

const webApp = new ExpressWebApp();
const repository = new MemoryRepository();
const routesFactory = new RoutesFactory(repository);

const routes = [
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

webApp.setRoutes(routes);
webApp.listen(Infra.getPort());
console.log(`ExpressWebApp listening on port ${Infra.getPort()}...`)
