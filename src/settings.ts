import { type Repository } from '@/app/repositories/Repository';
import { ExpressWebApp } from '@/app/adapters/ExpressWebApp/ExpressWebApp';
import { MemoryRepository } from '@/app/repositories/adapters/MemoryRepository';
import { type WebApp } from '@/types/WebApp';

interface settingsInterface {
  repository: Repository
  webApp: WebApp
  devPort: number
  testPort: number
}

export const settings: settingsInterface = {
  repository: new MemoryRepository(),
  webApp: new ExpressWebApp(),
  devPort: 5000,
  testPort: 5001
};
