/* eslint-disable new-cap */
import { type Controller } from '@/types/Controller';
import { type HttpMethod } from '@/types/HttpMethod';
import { type Middleware } from '@/types/Middleware';
import { type Route } from '@/types/Route';
import { type UseCase } from '@/types/UseCase';
import { type Repository } from './repositories/Repository';

type UseCaseClass = new(repository: Repository) => UseCase;
type MiddlewareClass = new() => Middleware;
type ControllerClass = new(...useCases: UseCase[]) => Controller;

export class RoutesFactory {

  constructor (private readonly repository: Repository) {}
  build (
    method: HttpMethod,
    path: string,
    controllerClass: ControllerClass,
    middlewareClasses?: MiddlewareClass[],
    useCasesClasses?: UseCaseClass[]
  ): Route {

    const useCases = useCasesClasses === undefined ? [] : useCasesClasses.map(ucc => new ucc(this.repository));
    const controller = new controllerClass(...useCases);
    const middlewares = middlewareClasses === undefined ? [] : middlewareClasses.map(mwc => new mwc());

    return {
      controller,
      path,
      method,
      middlewares
    };
  
  }

}
