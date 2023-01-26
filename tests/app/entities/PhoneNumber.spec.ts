import { describe, test, expect } from 'vitest';
import { PhoneNumber } from '@/app/entities/PhoneNumber';

describe(

  'Phone number especification',

  () => {

    const validPhoneNumber = '11 95555-9888';

    test('Should create a valid phone number instance',
      () => {

        const phoneNumer = PhoneNumber.create(validPhoneNumber);
        expect(phoneNumer.number).toEqual(validPhoneNumber);
        expect(phoneNumer).toBeInstanceOf(PhoneNumber);

      }
    );

  }

);
