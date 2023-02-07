import { type JsonValidator } from '@/types/JsonValidator';
import { type ValidationResult } from '@/types/ValidationResult';
import Ajv from 'ajv';

export class AjvSchemaValidator implements JsonValidator {

  private readonly ajv: Ajv;
  private readonly emailFormat: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor () {

    this.ajv = new Ajv({
      discriminator: true,
      formats: {
        email: this.emailFormat
      }
    });
  
  }

  validate (schema: Record<string, unknown>, data: any): ValidationResult {

    return {
      isValid: this.ajv.validate(schema, data),
      data: this.ajv.errors
    };
  
  }

}
