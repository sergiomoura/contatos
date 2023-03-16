import { type TokenGenerator } from '../TokenGenerator';
import * as jwt from 'jsonwebtoken';
const secret = 'secret';

export class JwtTokenGenerator implements TokenGenerator {
  
  create (payload: any): string {

    return jwt.sign(payload, secret);
  
  };

  validate (token: string): boolean {

    try {

      jwt.verify(token, secret);
      return true;
    
    } catch (error) {

      return false;
    
    }
  
  }

  decode (token: string): any {

    try {

      const decoded = jwt.verify(token, secret);
      delete (<jwt.JwtPayload>decoded).iat;
      return decoded;
    
    } catch (error) {

      return false;
    
    }
  
  }

}
