import { describe, test, expect, afterAll } from 'vitest';
import { Routes } from '@/app/Routes';
import { Infra } from '@/Infra';
import { FailedResponses } from '@/errors/FailedResponses';

const host = 'http://localhost';
const port = Infra.PORT_TEST;
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

describe(
  'Testing /auth endpoints',

  async () => {

    afterAll(
      () => { App.close(); }
    );

    const App = Infra.createWebApp();
    App.setRoutes(Routes);
    App.listen(port);
    
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
      
  }

);
