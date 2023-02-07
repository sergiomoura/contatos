import { describe, test, expect, afterAll } from 'vitest';
import { Routes } from '@/app/Routes';
import { settings } from '@/settings';
import { HttpErrorMessages } from '@/errors/HttpErrorMessages';

const App = settings.webApp;
App.setRoutes(Routes, '');

const host = 'http://localhost';
const port = settings.testPort;
const baseurl = '/api/v1';
const uri = '/auth/register';
const url = `${host}:${port}${baseurl}${uri}`;
const validName = 'Jonh Doe';
const validEmail = 'jonhdoe@test1.com';
const validPassword = '123456';

describe(
  'Testing successfull POST /auth/register endpoint',
  async () => {

    afterAll(
      () => { App.close(); }
    );

    App.listen(port);

    const validRequestBody = {
      name: validName,
      email: validEmail,
      password: validPassword
    };
    
    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(validRequestBody)
      }
    );

    const result = await response.json();
    
    const regex = /^[0-9|a-z|-]{36}$/;

    test('Should get a status 201', () => { expect(response.status).toEqual(201); });
    test('Should get an id for the user', () => { expect(result.id).toMatch(regex); });
    test('Should get the valid name', () => { expect(result.name).toEqual(validName); });
    test('Should get the valid email', () => { expect(result.email).toEqual(validEmail); });
    test('Should get no password back', () => { expect(result.password).toBeUndefined(); });
  
  }

);

describe(
  'Testing unsuccessfull POST /auth/register endpoint',
  async () => {

    const validRequestBody = {
      name: validName,
      email: validEmail,
      password: validPassword
    };
    
    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(validRequestBody)
      }
    );

    const result = await response.text();
    
    test('Should get a status 409', () => { expect(response.status).toEqual(409); });
    test('Should get error message', () => { expect(result).toMatch(HttpErrorMessages.userAlreadyExist); });
  
  }

);
