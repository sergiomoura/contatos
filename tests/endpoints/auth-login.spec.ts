import { describe, test, expect, afterAll } from 'vitest';
import { EnvType, Infra } from '@/Infra';
import { FailedResponses } from '@/errors/FailedResponses';
import jsonValidator from '@/utils/JsonValidator';
import loginResponseSchema from '@/schemas/responses/login.schema.json';

import TestWebAppFactory from './TestWebAppFactory';
import { Tokenizer } from '@/utils/Tokenizer';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';
import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';

describe('Test Endpoint: /auth/login', async () => {
  
  const repository = new MemoryRepository();
  await repository.clear();

  const createUserUseCase = new CreateUserUseCase(repository);
  const email = 'teste@teste.com';
  const name = 'Teste da Silva';
  const password = '123456';
  await createUserUseCase.execute({ email, name, password });

  const webApp = TestWebAppFactory(repository);
  const port = Infra.getPort(EnvType.TEST);
  const host = 'http://localhost';
  const baseurl = '/api/v1';
  const uri = '/auth/login';
  const url = `${host}:${port}${baseurl}${uri}`;

  const sendRequest = async (body): Promise<Response> => {

    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    };

    const response = await fetch(url, options);
    return response;
  
  };

  webApp.listen(port);

  afterAll(() => {

    webApp.close();
  
  });
  
  describe('Should get a forbiden status code and error message', () => {

    test('with invalid email and invalid password', async () => {

      const response = await sendRequest({ email: 'invalid@email.com', password: 'invalid' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with invalid email and valid password', async () => {

      const response = await sendRequest({ email: 'invalid@email.com', password });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with invalid email and empty password', async () => {

      const response = await sendRequest({ email: 'invalid@email.com', password: '' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with valid email and invalid password', async () => {

      const response = await sendRequest({ email, password: 'invalid' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with valid email and empty password', async () => {

      const response = await sendRequest({ email, password: '' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with empty email and invalid password', async () => {

      const response = await sendRequest({ email: '', password: 'invalid' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with empty email and valid password', async () => {

      const response = await sendRequest({ email: '', password });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });

    test('with empty email and empty password', async () => {

      const response = await sendRequest({ email: '', password: '' });
      expect(response.status).toBe(FailedResponses.failedToLogin.status);
      expect(await response.json()).toEqual(FailedResponses.failedToLogin.body);
    
    });
    
  });
  
  describe('Sending valid credentials', async () => {
    
    const response = await sendRequest({ email, password });
    const body = await response.json();

    test('should get a success status code', async () => {

      expect(response.status).toBe(200);
    
    });

    test('should get response body respecting the schema', async () => {

      const result = jsonValidator.validate(loginResponseSchema, body);
      expect(result.isValid).toBe(true);
    
    });

    test('should get a valid token', async () => {

      const result = Tokenizer.validate(body.token);
      expect(result).toBe(true);
    
    });
  
  });

});
