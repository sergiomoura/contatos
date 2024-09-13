/* eslint-disable padded-blocks */
import { type Email } from '@/entities/Email';
import { type PhoneNumber } from '@/entities/PhoneNumber';
import { hash } from '@/utils/HashGenerator';

export class Contact {

  private readonly _id: string;
  public get id (): string {
    return this._id;
  }

  private readonly _name: string;
  public get name (): string {
    return this._name;
  }

  private readonly _emails: Email[];
  public get emails (): Email[] {
    return this._emails;
  }

  private readonly _phoneNumbers: PhoneNumber[];
  public get phoneNumbers (): PhoneNumber[] {
    return this._phoneNumbers;
  }

  private constructor (name: string, emails: Email[] = [], phoneNumbers: PhoneNumber[] = []) {

    this._id = hash();
    this._name = name;
    this._emails = emails;
    this._phoneNumbers = phoneNumbers;
  
  }

  static create (name: string, emails: Email[] = [], phoneNumbers: PhoneNumber[] = []): Contact {

    return new Contact(name, emails, phoneNumbers);
    
  }

}
