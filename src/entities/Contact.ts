/* eslint-disable padded-blocks */
import { type Email } from '@/entities/Email';
import { type PhoneNumber } from '@/entities/PhoneNumber';
import { hash } from '@/utils/HashGenerator';

export class Contact {

  private readonly _id: string;
  public get id (): string {
    return this._id;
  }

  private _name: string;
  public get name (): string {
    return this._name;
  }

  public set name (value: string) {
    this._name = value;
  }

  private _emails: Email[];
  public get emails (): Email[] {
    return this._emails;
  }

  public set emails (value: Email[]) {
    this._emails = value;
  }

  private _phoneNumbers: PhoneNumber[];
  public get phoneNumbers (): PhoneNumber[] {
    return this._phoneNumbers;
  }

  public set phoneNumbers (value: PhoneNumber[]) {
    this._phoneNumbers = value;
  }

  private constructor (name: string, emails: Email[] = [], phoneNumbers: PhoneNumber[] = [], id?: string) {

    this._id = id === undefined ? hash() : id;
    this._name = name;
    this._emails = emails;
    this._phoneNumbers = phoneNumbers;
  
  }

  static create (name: string, emails: Email[] = [], phoneNumbers: PhoneNumber[] = [], id?: string): Contact {

    return new Contact(name, emails, phoneNumbers, id);
    
  }

}
