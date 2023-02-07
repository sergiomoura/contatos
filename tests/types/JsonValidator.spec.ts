import { Infra } from '@/Infra';
import { describe, expect, test } from 'vitest';

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 6
    }
  },
  required: ['name', 'email', 'password']
};

const validData = {
  name: 'Jonh Doe',
  email: 'jonhdoe@test.com',
  password: '123456'
};

const invalidData = {
  name: '',
  email: 'jonhdoe@test.com',
  password: '123456'
};

const jsonValidator = Infra.createJsonValidator();

describe(
  'JsonValidator specifications',
  () => {

    test('Should return a positive validation result',
      () => {

        const result = jsonValidator.validate(schema, validData);
        expect(result.isValid).toEqual(true);
      
      }
    );

    test('Should return a negative validation result',
      () => {

        const result = jsonValidator.validate(schema, invalidData);
        expect(result.isValid).toEqual(false);
      
      }
    );
  
  }
);
