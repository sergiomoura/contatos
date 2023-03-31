import { type EmailInDTO } from './Email.indto';
import { type PhoneNumberInDTO } from './PhoneNumber.indto';

export type ContactInDTO = {
  name: string
  emails: EmailInDTO[]
  phoneNumbers: PhoneNumberInDTO[]
};
