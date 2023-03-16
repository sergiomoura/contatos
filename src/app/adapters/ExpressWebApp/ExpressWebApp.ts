/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request } from '@/types/Request';
import { type WebApp } from '@/types/WebApp';
import { type Controller } from '@/types/Controller';
import { type Server } from 'http';
import { type Router as ExpressRouterType } from 'express-serve-static-core';
import express, { type Express, Router as createExpressRouter, type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { type Route } from '@/types/Route';
import { type Middleware } from '@/types/Middleware';

type ExpressNextFunction = () => void;
type ExpressController = (req: ExpressRequest, res: ExpressResponse) => void;
type ExpressMiddleware = (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => void;

export class ExpressWebApp implements WebApp {

  private readonly app: Express;
  private readonly router: ExpressRouterType;
  private server: Server;

  constructor () {

    this.app = express();
    this.router = createExpressRouter();
    this.app.use(express.json());
    this.app.use(this.router);
  
  }

  listen (port: number): void {

    this.server = this.app.listen(port);
  
  };

  setRoutes (routes: Route[]): void {

    routes.forEach(route => { this.registerExpressRoute(route); });
  
  }

  close (): void {

    this.server.close();
  
  };

  private registerExpressRoute (route: Route, basePath: string = ''): void {

    let expressMiddlewares: ExpressMiddleware[] = [];
    if (route.middlewares !== undefined) {

      expressMiddlewares = route.middlewares.map(mw => { return this.createExpressMiddleware(mw); });
      
    } ;
    const expressController = this.createExpressController(route.controller);
    this.router[route.method](basePath + route.path, ...expressMiddlewares, expressController);
  
  }
  
  private createExpressController (controller: Controller): ExpressController {
    
    const expressController = async (req, res): Promise<void> => {

      const request: Request = {
        headers: req.headers,
        body: req.body
      };

      const response = await controller.handle(request);
      res.status(response.status).json(response.body);
    
    };
    
    return expressController;
  
  }

  private createExpressMiddleware (middleware: Middleware): ExpressMiddleware {

    const expressMiddleware = async (req, res, next): Promise<void> => {

      const result = await middleware.handle(req);
      if ('status' in result) {

        res.status(result.status).json(result.body);
      
      } else {

        req = result;
        next();
      
      }
    
    };
    
    return expressMiddleware;
  
  }

}
