
import { hash } from '@/utils/HashGenerator';
import { isValid } from '@/utils/Validators';
import { Errors } from '@/errors/Errors';

export class Email {
  
  private readonly _id: string;
  public get id (): string { return this._id; }
  
  private readonly _address: string;
  public get address (): string { return this._address; }

  private constructor (email: string) {

    this._id = hash();
    this._address = email;
  
  }
  
  static create (email: string): Email {

    if (isValid.email(email)) {

      return new Email(email);
    
    } else {

      throw Errors.invalidEmailError;
    
    }
  
  }

}
