/* eslint-disable padded-blocks */
import { hash } from '@/utils/HashGenerator';

export class PhoneNumber {

  private readonly _id: string;
  public get id (): string { return this._id; }

  private readonly _number: string;
  public get number (): string { return this._number; }

  private constructor (number: string) {

    this._id = hash();
    this._number = number;

  }

  static create (number: string): PhoneNumber {
    
    return new PhoneNumber(number);
  }

}
