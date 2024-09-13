import { type HashGenerator } from '../HashGenerator';
import * as crypto from 'crypto';

export class CryptoHashGenerator implements HashGenerator {

  hash (): string {

    return crypto.randomUUID();
  
  };

}
