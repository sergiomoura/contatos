import { ExpressWebApp } from '@/adapters/ExpressWebApp/ExpressWebApp';

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

import { describe, test, expect, afterAll } from 'vitest';
import { EnvType, Infra } from '@/Infra';
import { FailedResponses } from '@/errors/FailedResponses';

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

const host = 'http://localhost';
const port = Infra.getPort(EnvType.TEST);
const baseurl = '/api/v1';

const validName = 'Jonh Doe';
const validEmail = 'jonhdoe@test1.com';
const validPassword = '123456';

const validRegisterRequestBody = {
  name: validName,
  email: validEmail,
  password: validPassword
};

const validLoginRequestBody = {
  email: validEmail,
  password: validPassword
};

const invalidLoginRequestBody = {
  email: 'invalid@email.com',
  password: 'invalid-password'
};

webApp.setRoutes(routes);
webApp.listen(port);

describe(

  'Testing endpoints',

  async () => {

    afterAll(() => { webApp.close(); });

    describe('/auth/register', () => {
        
      test('Should create a user', async () => {

        const uri = '/auth/register';
        const url = `${host}:${port}${baseurl}${uri}`;
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(validRegisterRequestBody)
          }
        );
    
        const result = await response.json();
        
        const regex = /^[0-9|a-z|-]{36}$/;
    
        expect(response.status).toEqual(201);
        expect(result.user.id).toMatch(regex);
        expect(result.user.name).toEqual(validName);
        expect(result.user.email).toEqual(validEmail);
        expect(result.user.password).toBeUndefined();
      
      });

      test('Should get a "already existent user" error', async () => {

        const uri = '/auth/register';
        const url = `${host}:${port}${baseurl}${uri}`;
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(validRegisterRequestBody)
          }
        );

        expect(response.status).toEqual(FailedResponses.userAlreadyExists.status);
      
      });

      test('Should return a "bad request" error', async () => {

        const uri = '/auth/register';
        const url = `${host}:${port}${baseurl}${uri}`;
        const invalidRequestBody = {
          name: 'oo',
          email: 'notanemail',
          password: 'short'
        };

        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(invalidRequestBody)
          }
        );

        expect(response.status).toEqual(FailedResponses.invalidDataForUserCreation.status);
        
      });

    });

    describe('/auth/login', () => {

      test('Should get a succesful login response', async () => {
    
        const uri = '/auth/login';
        const url = `${host}:${port}${baseurl}${uri}`;
          
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(validLoginRequestBody)
          }
        );
      
        expect(response.status).toEqual(200);
        
      });
        
      test('Should get a failed login response', async () => {
    
        const uri = '/auth/login';
        const url = `${host}:${port}${baseurl}${uri}`;
          
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(invalidLoginRequestBody)
          }
        );
      
        expect(response.status).toEqual(FailedResponses.failedToLogin.status);
        
      });
    
    });

  }
);
