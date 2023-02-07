import { ExpressWebApp } from './app/adapters/ExpressWebApp/ExpressWebApp';
import { MemoryRepository } from './app/repositories/adapters/MemoryRepository';
import { type Repository } from './app/repositories/Repository';
import { type WebApp } from './types/WebApp';

function createWebApp (): WebApp {

  return new ExpressWebApp();

}

function createRepository (): Repository {

  return new MemoryRepository();

}

const PORT_DEV = 5000;
const PORT_TEST = 5001;

const Infra = { createWebApp, createRepository, PORT_TEST, PORT_DEV };

export { Infra };
