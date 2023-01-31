import { settings } from '@/settings';
import { type Controller } from '@/types/Controller';
import { HttpMethod } from '@/types/HttpMethod';
import { type Request } from '@/types/Request';
import { type Router } from '@/types/Router';
import { describe, expect, test } from 'vitest';

describe(
  'WebApp specifications',
  
  () => {

    const host = 'http://localhost';
    const port = 3030;
    const responseBody = { msg: 'test' };
    const responseStatus = 200;
    const response = { status: responseStatus, body: responseBody };

    test('Should call first level controllers',
      async () => {

        const controller1: Controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });
        const controller2: Controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });

        const uri1 = '/';
        const uri2 = '/test';

        const app = settings.webApp;

        const router: Router = {
          middlewares: [],
          routes: [
            {
              method: HttpMethod.GET,
              uri: uri1,
              destiny: controller1,
              middlewares: []
            },
            {
              method: HttpMethod.GET,
              uri: uri2,
              destiny: controller2,
              middlewares: []
            }
          ]
        };
        
        app.setRouter(router);
        app.listen(port);

        let res = await fetch(`${host}:${port}${uri1}`);
        let content = await res.json();
        expect(res.status).toBe(200);
        expect(content).toEqual(responseBody);

        res = await fetch(`${host}:${port}${uri2}`);
        content = await res.json();
        expect(res.status).toBe(200);
        expect(content).toEqual(responseBody);
      
      }
    );
  
  }

);
