import { type Repository } from '@/repositories/Repository';

export abstract class UseCase {

  constructor (protected readonly repository: Repository) {}
  abstract execute (...args: any[]): any;

}
