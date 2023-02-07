import { AjvSchemaValidator } from './app/adapters/AjvSchemaValidator/AjvSchemaValidator';
import { ExpressWebApp } from './app/adapters/ExpressWebApp/ExpressWebApp';
import { MemoryRepository } from './app/repositories/adapters/MemoryRepository';
import { type Repository } from './app/repositories/Repository';
import { type JsonValidator } from './types/JsonValidator';
import { type WebApp } from './types/WebApp';

function createWebApp (): WebApp {

  return new ExpressWebApp();

}

function createRepository (): Repository {

  return new MemoryRepository();

}

function createJsonValidator (): JsonValidator {

  return new AjvSchemaValidator();

}

const PORT_DEV = 5000;
const PORT_TEST = 5001;

const Infra = {
  createWebApp,
  createRepository,
  createJsonValidator,
  PORT_TEST,
  PORT_DEV
};

export { Infra };
