/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request } from '@/types/Request';
import { type Router } from '@/types/Router';
import { type WebApp } from '@/types/WebApp';
import { type Controller } from '@/types/Controller';
import { type Server } from 'http';
import { type Router as ExpressRouterType } from 'express-serve-static-core';
import express, { type Express, Router as createExpressRouter, type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { type Route } from '@/types/Route';

type ExpressController = (req: ExpressRequest, res: ExpressResponse) => void;

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

  setRouter (router: Router): void {

    router.routes.forEach(route => {

      if (this.isRoute(route)) {
        
        this.registerExpressRoute(<Route>route, router.basePath);
      
      } else {

        const subRouter = <Router>route;
        this.setRouter(subRouter);

      }
    
    });
  
  }

  close (): void {

    this.server.close();
  
  };

  private registerExpressRoute (route: Route, basePath: string = ''): void {

    const expressController = this.createExpressController(route.controller);
    this.router[route.method](basePath + route.path, expressController);
  
  }

  private isRoute (destiny: Route | Router): boolean {

    return (<Route>destiny).controller !== undefined;
  
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

}
