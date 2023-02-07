import { Infra } from '@/Infra';
import { type Controller } from '@/types/Controller';
import { HttpMethod } from '@/types/HttpMethod';
import { type Request } from '@/types/Request';
import { type Route } from '@/types/Route';
import { describe, expect, test } from 'vitest';

const host = 'http://localhost';
const port = 3030;
const responseBody = { msg: 'test' };
const responseStatus = 200;
const response = { status: responseStatus, body: responseBody };
const controller = <Controller>(<unknown>{ handle: (req: Request) => { return response; } });
const path1 = '';
const path2 = '/test';
const sub = '/sub';
const subA = '/sub-a';
const subB = '/sub-b';
const subB1 = '/sub-b-1';
const subB2 = '/sub-b-2';
const app = Infra.createWebApp();
const routes: Route[] = [
  {
    path: path1,
    middlewares: [],
    handler: { method: HttpMethod.GET, controller },
    children: [
      {
        path: path2,
        handler: {
          method: HttpMethod.GET,
          controller
        },
        middlewares: []
      },
      {
        path: sub,
        handler: { method: HttpMethod.GET, controller },
        children: [
          {
            path: subA,
            handler: {
              controller,
              method: HttpMethod.GET
            }
          },
          {
            path: subB,
            handler: {
              controller,
              method: HttpMethod.GET
            },
            children: [
              {
                path: subB1,
                handler: {
                  controller,
                  method: HttpMethod.GET
                }
              },
              {
                path: subB2,
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

app.setRoutes(routes, '');
app.listen(port);

describe(
  'WebApp specifications',
  
  () => {

    test('Should call level 1 controllers',
      async () => {
        
        console.log(`Required: ${host}:${port}${path1}`);
        const response1 = await fetch(`${host}:${port}${path1}`);
        expect(response1.status).toBe(200);
        expect(await response1.json()).toEqual(responseBody);
        
        console.log(`Required: ${host}:${port}${path2}`);
        const response2 = await fetch(`${host}:${port}${path2}`);
        expect(response2.status).toBe(200);
        expect(await response2.json()).toEqual(responseBody);
      
      }
    );
  
    // test('Should call level 2 controllers',
    //   async () => {

    //     const response1 = await fetch(`${host}:${port}${sub}${subA}`);
    //     expect(response1.status).toBe(200);
    //     expect(await response1.json()).toEqual(responseBody);

    //     const response2 = await fetch(`${host}:${port}${sub}${subB}`);
    //     expect(response2.status).toBe(200);
    //     expect(await response2.json()).toEqual(responseBody);
      
    //   }
    // );

    // test('Should call level 3 controllers',
    //   async () => {

    //     const response1 = await fetch(`${host}:${port}${sub}${subB}${subB1}`);
    //     expect(response1.status).toBe(200);
    //     expect(await response1.json()).toEqual(responseBody);

    //     const response2 = await fetch(`${host}:${port}${sub}${subB}${subB2}`);
    //     expect(response2.status).toBe(200);
    //     expect(await response2.json()).toEqual(responseBody);
      
    //   }
    // );
    
  }

);
