import { type EmailOutDTO } from './Email.outdto';
import { type PhoneNumberOutDTO } from './PhoneNumber.outdto';

export type ContactOutDTO = {
  id: string
  name: string
  emails: EmailOutDTO[]
  phoneNumbers: PhoneNumberOutDTO[]
};
