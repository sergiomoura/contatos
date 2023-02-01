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
    }
  ]
};
app.setRouter(router);
app.listen(port);

describe(
  'WebApp specifications',
  
  () => {

    test('Should call first level controllers',
      async () => {

        let res = await fetch(`${host}:${port}${path1}`);
        let content = await res.json();
        expect(res.status).toBe(200);
        expect(content).toEqual(responseBody);

        res = await fetch(`${host}:${port}${path2}`);
        content = await res.json();
        expect(res.status).toBe(200);
        expect(content).toEqual(responseBody);
      
      }
    );
  
  }

);
