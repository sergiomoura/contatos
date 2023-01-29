import { type Repository } from '@/app/repositories/Repository';
import { MemoryRepository } from './app/repositories/adapters/MemoryRepository';

interface settingsInterface {
  repository: Repository
}

export const settings: settingsInterface = {
  repository: new MemoryRepository()
};
