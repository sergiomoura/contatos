import { type Crypter } from '../Crypter';
import * as bcrypt from 'bcrypt';
const SALT = 10;

export class BCrypter implements Crypter {

  encrypt (plainString: string): string {

    return bcrypt.hashSync(plainString, SALT);
  
  }

  compare (plainString: string, hashedString: string): boolean {

    return bcrypt.compareSync(plainString, hashedString);
  
  }

}
