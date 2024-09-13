import { ExpressWebApp } from '@/adapters/ExpressWebApp/ExpressWebApp';
import { type Controller } from '@/types/Controller';
import { HttpMethod } from '@/types/HttpMethod';
import { type Middleware } from '@/types/Middleware';
import { type Request } from '@/types/Request';
import { type Route } from '@/types/Route';
import { describe, expect, test, vi, afterEach } from 'vitest';

const host = 'http://localhost';
const port = 3030;
const responseBody = { msg: 'test' };
const responseStatus = 200;
const responseStatusError = 400;
const responseOk = { status: responseStatus, body: responseBody };
const responseFail = { status: responseStatusError, body: responseBody };
const rejectionMock = vi.fn();
const admissionMock = vi.fn();

const rejectionMiddleware: Middleware = {
  handle: async (request: Request) => {

    rejectionMock();
    return responseFail;
  
  }
};

const admissionMiddleware: Middleware = {
  handle: async (request: Request) => {

    admissionMock();
    return request;
  
  }
};

const controller = <Controller>(<unknown>{ handle: (req: Request) => { return responseOk; } });
const path1 = '';
const path2 = '/test';
const path3 = '/test/sub';
const path4 = '/test/sub-a';
const path5 = '/test/sub-b';
const path6 = '/test/sub-c';
const app = new ExpressWebApp();

const routes: Route[] = [
  {
    path: path1,
    middlewares: [],
    method: HttpMethod.GET,
    controller
  },
  {
    path: path2,
    middlewares: [admissionMiddleware],
    method: HttpMethod.GET,
    controller
  },
  {
    path: path3,
    middlewares: [admissionMiddleware, admissionMiddleware],
    method: HttpMethod.GET,
    controller
  },
  {
    path: path4,
    middlewares: [rejectionMiddleware, admissionMiddleware],
    method: HttpMethod.GET,
    controller
  },
  {
    path: path5,
    middlewares: [admissionMiddleware, rejectionMiddleware],
    method: HttpMethod.GET,
    controller
  },
  {
    path: path6,
    middlewares: [rejectionMiddleware, rejectionMiddleware],
    method: HttpMethod.GET,
    controller
  }
];

app.setRoutes(routes);
app.listen(port);

describe(
  'WebApp specifications',
  
  () => {

    afterEach(
      () => {

        admissionMock.mockClear();
        rejectionMock.mockClear();
      
      }
    );

    test('Should call level 1 controllers',
      async () => {

        const response1 = await fetch(`${host}:${port}${path1}`);
        expect(response1.status).toBe(200);
        expect(await response1.json()).toEqual(responseBody);
            
      }
    );
  
    test('Should call admission middleware once',
      async () => {

        const response = await fetch(`${host}:${port}${path2}`);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(responseBody);
        expect(admissionMock).toBeCalledTimes(1);
     
      }
    );

    test('Should call admission middleware twice',
      async () => {

        const response = await fetch(`${host}:${port}${path3}`);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(responseBody);
        expect(admissionMock).toBeCalledTimes(2);
     
      }
    );

    test('Should not call admission and should call rejection once.',
      async () => {

        const response = await fetch(`${host}:${port}${path4}`);
        expect(response.status).toBe(responseStatusError);
        expect(rejectionMock).toBeCalledTimes(1);
        expect(admissionMock).toBeCalledTimes(0);
      
      }
    );

    test('Should call admission once and should call rejection once.',
      async () => {

        const response = await fetch(`${host}:${port}${path5}`);
        expect(response.status).toBe(responseStatusError);
        expect(rejectionMock).toBeCalledTimes(1);
        expect(admissionMock).toBeCalledTimes(1);
      
      }
    );

    test('Should call rejection once',
      async () => {

        const response = await fetch(`${host}:${port}${path6}`);
        expect(response.status).toBe(responseStatusError);
        expect(rejectionMock).toBeCalledTimes(1);
      
      }
    );
    
  }

);
