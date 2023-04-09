import { describe, test, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { EnvType, Infra } from '@/Infra';
import { FailedResponses } from '@/errors/FailedResponses';
import jsonValidator from '@/utils/JsonValidator';
import registerUserSchema from '@/schemas/responses/registerUser.schema.json';

import TestWebAppFactory from './TestWebAppFactory';
import { Tokenizer } from '@/utils/Tokenizer';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';

describe('Test Endpoint: /auth/register', () => {
  
  const repository = new MemoryRepository();
  const webApp = TestWebAppFactory(repository);
  
  const port = Infra.getPort(EnvType.TEST);
  const host = 'http://localhost';
  const baseurl = '/api/v1';
  const uri = '/auth/register';
  const url = `${host}:${port}${baseurl}${uri}`;
  
  webApp.listen(port);

  afterAll(() => {

    webApp.close();
  
  });

  afterEach(async () => {

    await repository.clear();
  
  });

  describe('Sending invalid request', () => {

    test('should get a failed response("invalid name")',
      async () => {
  
        const invalidName = 'Ze';
        const registerRequestBody = {
          name: invalidName,
          email: 'teste@teste.com',
          password: '123456'
        };
  
        const options: RequestInit = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(registerRequestBody)
        };
  
        const response = await fetch(url, options);
        const responseData = await response.json();
  
        expect(response.status).toBe(FailedResponses.invalidDataForUserCreation.status);
        expect(responseData).toEqual(FailedResponses.invalidDataForUserCreation.body);
      
      }
    );
    test('should get a failed response("invalid email")',
      async () => {
  
        const invalidEmail = 'notAnEmail';
        const registerRequestBody = {
          name: 'Teste da Silva',
          email: invalidEmail,
          password: '123456'
        };
  
        const options: RequestInit = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(registerRequestBody)
        };
  
        const response = await fetch(url, options);
        const responseData = await response.json();
  
        expect(response.status).toBe(FailedResponses.invalidDataForUserCreation.status);
        expect(responseData).toEqual(FailedResponses.invalidDataForUserCreation.body);
    
      }
    );
    test('should get a failed response("invalid password")',
      async () => {
  
        const invalidPassword = '12345';
        const registerRequestBody = {
          name: 'Teste da Silva',
          email: 'teste@teste.com',
          password: invalidPassword
        };
  
        const options: RequestInit = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(registerRequestBody)
        };
  
        const response = await fetch(url, options);
        const responseData = await response.json();
  
        expect(response.status).toBe(FailedResponses.invalidDataForUserCreation.status);
        expect(responseData).toEqual(FailedResponses.invalidDataForUserCreation.body);
  
      }
    );
    
  });

  describe('Sending valid request', () => {

    let response: Response;
    let responseBody: any;

    const name = 'Teste da Silva';
    const email = 'teste@teste.com';
    const password = '123456';

    beforeAll(
      async () => {

        const registerRequestBody = { name, email, password };
    
        const options: RequestInit = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(registerRequestBody)
        };
    
        response = await fetch(url, options);
        responseBody = await response.json();
      
      }
    );

    test('response status should equal 201',
      () => {

        expect(response.status).toBe(201);
  
      }
    );

    test('response body should satisfy schema',
      async () => {
  
        const validationResult = jsonValidator.validate(registerUserSchema, responseBody);
        expect(validationResult.isValid).toBe(true);
  
      }
    );

    test('name should remain the same',
      async () => {

        expect(responseBody.user.name).toEqual(name);
  
      }
    );

    test('email should remain the same',
      async () => {
               
        expect(responseBody.user.email).toEqual(email);
  
      }
    );

    test('returned token should be valid',
      async () => {
        
        expect(Tokenizer.validate(responseBody.token)).toBe(true);
  
      }
    );
  
  });

  describe('Trying to register with same email', async () => {

    const name = 'Teste da Silva';
    const email = 'teste@teste.com';
    const password = '123456';
    const registerRequestBody = { name, email, password };
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(registerRequestBody)
    };

    await fetch(url, options);
    const secondResponse = await fetch(url, options);

    test('response status should equal 409',
      () => {

        expect(secondResponse.status).toBe(409);
  
      }
    );
  
  });

});
