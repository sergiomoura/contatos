import request from 'supertest';
import { describe, test, expect } from 'vitest';
import { App } from '@/app/main/App';
import { HttpErrorMessages } from '@/errors/HttpErrorMessages';

const baseurl = '/api/v1';
const uri = '/auth/register';
const validName = 'Jonh Doe';
const validEmail = 'jonhdoe@test1.com';
const validPassword = '123456';

describe(
  'Testing successfull POST /auth/register endpoint',
  async () => {

    const validRequestBody = {
      name: validName,
      email: validEmail,
      password: validPassword
    };
    
    const response = await request(App)
      .post(baseurl + uri)
      .set('Content-type', 'application/json')
      .send(validRequestBody);
    
    const regex = /^[0-9|a-z|-]{36}$/;

    test('Should get a status 201', () => { expect(response.status).toEqual(201); });
    test('Should get an id for the user', () => { expect(response.body.id).toMatch(regex); });
    test('Should get the valid name', () => { expect(response.body.name).toEqual(validName); });
    test('Should get the valid email', () => { expect(response.body.email).toEqual(validEmail); });
    test('Should get no password back', () => { expect(response.body.password).toBeUndefined(); });
  
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
    
    const response = await request(App)
      .post(baseurl + uri)
      .set('Content-type', 'application/json')
      .send(validRequestBody);
    
    test('Should get a status 409', () => { expect(response.status).toEqual(409); });
    test('Should get error message on the body', () => { expect(response.body).toMatch(HttpErrorMessages.userAlreadyExist); });
  
  }

);
