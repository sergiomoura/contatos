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

    router.routes.forEach(route => { this.registerExpressRoute(route); });
  
  }

  close (): void {

    this.server.close();
  
  };

  private registerExpressRoute (route: Route): void {

    if (ExpressWebApp.isDestinyController(route.destiny)) {

      const expressController = ExpressWebApp.createExpressController(<Controller>route.destiny);
      this.router[route.method](route.uri, expressController);

    } else {

      this.setRouter(<Router>route.destiny);
    
    }
  
  }

  private static isDestinyController (destiny: Controller | Router): boolean {

    return (<Controller>destiny).handle !== undefined;
  
  }
  
  private static createExpressController (controller: Controller): ExpressController {
    
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
