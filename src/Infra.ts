import { AjvSchemaValidator } from './app/adapters/AjvSchemaValidator/AjvSchemaValidator';
import { ExpressWebApp } from './app/adapters/ExpressWebApp/ExpressWebApp';
import { MemoryRepository } from './app/repositories/adapters/MemoryRepository';
import { type Repository } from './app/repositories/Repository';
import { type JsonValidator } from './types/JsonValidator';
import { type WebApp } from './types/WebApp';

export enum EnvType {
  PROD = 'production',
  DEV = 'development',
  TEST = 'test'
}

function createWebApp (): WebApp {

  return new ExpressWebApp();

}

function createRepository (): Repository {

  return new MemoryRepository();

}

function createJsonValidator (): JsonValidator {

  return new AjvSchemaValidator();

}

const PORT_PROD = 8080;
const PORT_DEV = 5000;
const PORT_TEST = 5001;

function getPort (env?: EnvType): number {

  if (process.env.PORT !== undefined) {

    return Number(process.env.PORT);
  
  }

  switch (env) {

    case EnvType.PROD:
      return PORT_PROD;
    
    case EnvType.TEST:
      return PORT_TEST;
  
    default:
      return PORT_DEV;
  
  }

}

const Infra = {
  createWebApp,
  createRepository,
  createJsonValidator,
  getPort
};

export { Infra };
