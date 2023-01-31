import { settings } from '@/settings';
import { type Controller } from '@/types/Controller';
import { HttpMethod } from '@/types/HttpMethod';
import { type Request } from '@/types/Request';
import { type Router } from '@/types/Router';
import { describe, expect, test } from 'vitest';

describe(
  'WebApp specifications',
  
  () => {

    test('Should call first level controllers',
      async () => {

        const host = 'http://localhost';
        const port = 3030;
        const responseBody = { msg: 'test' };
        const responseStatus = 200;
        const response = { status: responseStatus, body: responseBody };
        const controller1: Controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });
        const uri1 = '/';
        const app = settings.webApp;

        const router: Router = {
          middlewares: [],
          routes: [
            {
              method: HttpMethod.GET,
              uri: uri1,
              destiny: controller1,
              middlewares: []
            }
          ]
        };
        
        app.setRouter(router);
        app.listen(port);
        const res = await fetch(`${host}:${port}${uri1}`);
        const content = await res.json();
        expect(res.status).toBe(200);
        expect(content).toEqual(responseBody);
      
      }
    );
  
  }

);
