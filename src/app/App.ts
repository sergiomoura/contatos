
import { Routes } from '@/app/Routes';
import { Infra } from '@/Infra';

const App = Infra.createWebApp();
App.setRoutes(Routes);

export { App };
