/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request } from '@/types/Request';
import { type WebApp } from '@/types/WebApp';
import { type Controller } from '@/types/Controller';
import { type Server } from 'http';
import { type Router as ExpressRouterType } from 'express-serve-static-core';
import express, { type Express, Router as createExpressRouter, type Request as ExpressRequest, type Response as ExpressResponse } from 'express';
import { type Route } from '@/types/Route';
import { HttpMethod } from '../../../types/HttpMethod';

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

  setRoutes (routes: Route[], basePath: string = ''): void {

    routes.forEach(route => {

      this.registerExpressRoute(route, basePath);
      
      if (route.children !== undefined) {

        this.setRoutes(route.children, basePath + route.path);

      }
    
    });
  
  }

  close (): void {

    this.server.close();
  
  };

  private registerExpressRoute (route: Route, basePath: string = ''): void {

    if (route.handler !== undefined) {

      const expressController = this.createExpressController(route.handler.controller);
      console.log(`Defining: ${basePath + route.path}`);
      this.router[route.handler.method](basePath + route.path, expressController);
    
    }
  
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

const responseBody = { msg: 'test' };
const responseStatus = 200;
const response = { status: responseStatus, body: responseBody };
const controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });
const routes: Route[] = [
  {
    path: '',
    middlewares: [],
    handler: { method: HttpMethod.GET, controller },
    children: [
      {
        path: '/test',
        handler: {
          method: HttpMethod.GET,
          controller
        },
        middlewares: []
      },
      {
        path: '/sub',
        handler: { method: HttpMethod.GET, controller },
        children: [
          {
            path: '/subA',
            handler: {
              controller,
              method: HttpMethod.GET
            }
          },
          {
            path: '/subB',
            handler: {
              controller,
              method: HttpMethod.GET
            },
            children: [
              {
                path: '/subB1',
                handler: {
                  controller,
                  method: HttpMethod.GET
                }
              },
              {
                path: '/subB2',
                handler: {
                  controller,
                  method: HttpMethod.GET
                }
              }
            ]
            
          }
        ]
      }
    ]
  }
];
const app = new ExpressWebApp();
app.setRoutes(routes, '');
