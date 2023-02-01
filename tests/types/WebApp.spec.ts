import { settings } from '@/settings';
import { type Controller } from '@/types/Controller';
import { HttpMethod } from '@/types/HttpMethod';
import { type Request } from '@/types/Request';
import { type Router } from '@/types/Router';
import { describe, expect, test } from 'vitest';

const host = 'http://localhost';
const port = 3030;
const responseBody = { msg: 'test' };
const responseStatus = 200;
const response = { status: responseStatus, body: responseBody };
const controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });
const path1 = '/';
const path2 = '/test';
const sub = '/sub';
const subA = '/sub-a';
const subB = '/sub-b';
const subB1 = '/sub-b-1';
const subB2 = '/sub-b-2';
const app = settings.webApp;
const router: Router = {
  basePath: '',
  middlewares: [],
  routes: [
    {
      method: HttpMethod.GET,
      path: path1,
      controller,
      middlewares: []
    },
    {
      method: HttpMethod.GET,
      path: path2,
      controller,
      middlewares: []
    },
    {
      basePath: sub,
      routes: [
        {
          controller,
          path: subA,
          method: HttpMethod.GET
        },
        {
          controller,
          path: subB,
          method: HttpMethod.GET
        },
        {
          basePath: subB,
          routes: [
            {
              controller,
              path: subB1,
              method: HttpMethod.GET
            },
            {
              controller,
              path: subB2,
              method: HttpMethod.GET
            }
          ]
        }
      ]
    }
  ]
};
app.setRouter(router);
app.listen(port);

describe(
  'WebApp specifications',
  
  () => {

    test('Should call level 1 controllers',
      async () => {

        const response1 = await fetch(`${host}:${port}${path1}`);
        expect(response1.status).toBe(200);
        expect(await response1.json()).toEqual(responseBody);

        const response2 = await fetch(`${host}:${port}${path2}`);
        expect(response2.status).toBe(200);
        expect(await response2.json()).toEqual(responseBody);
      
      }
    );
  
    test('Should call level 2 controllers',
      async () => {

        const response1 = await fetch(`${host}:${port}${sub}${subA}`);
        expect(response1.status).toBe(200);
        expect(await response1.json()).toEqual(responseBody);

        const response2 = await fetch(`${host}:${port}${sub}${subB}`);
        expect(response2.status).toBe(200);
        expect(await response2.json()).toEqual(responseBody);
      
      }
    );

    test('Should call level 3 controllers',
      async () => {

        const response1 = await fetch(`${host}:${port}${sub}${subB}${subB1}`);
        expect(response1.status).toBe(200);
        expect(await response1.json()).toEqual(responseBody);

        const response2 = await fetch(`${host}:${port}${sub}${subB}${subB2}`);
        expect(response2.status).toBe(200);
        expect(await response2.json()).toEqual(responseBody);
      
      }
    );
    
  }

);
