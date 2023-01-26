import { hash } from '@/utils/HashGenerator';

export class User {

  private readonly _id: string;
  public get id (): string { return this._id; }

  private _name: string;
  public get name (): string { return this._name; }
  public set name (value: string) { this._name = value; }

  private _email: string;
  public get email (): string { return this._email; }
  public set email (value: string) { this._email = value; }

  private _password: string;
  public get password (): string { return this._password; }
  public set password (value: string) { this._password = value; }

  private constructor (name: string, email: string, password: string) {

    this._id = hash();
    this._name = name;
    this._email = email;
    this._password = password;
  
  }

  static create (name: string, email: string, password: string): User {

    return new User(name, email, password);
    
  }

}
