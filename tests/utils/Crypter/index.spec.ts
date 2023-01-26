import { crypter } from '@/utils/Crypter';
import { describe, expect, test } from 'vitest';

describe(
  'Crypter Specification',
  () => {
    
    const rightPlainText = 'right password';
    const wrongPlainTexto = 'wrong password';

    test('Should encrypt a plain string and succesfully compare do hashed',
      () => {

        const hashed = crypter.encrypt(rightPlainText);
        const succeded = crypter.compare(rightPlainText, hashed);
        expect(succeded).toEqual(true);
      
      }
    );

    test('Should encrypt a plain string and fail on hashed comparsion',
      () => {

        const hashed = crypter.encrypt(rightPlainText);
        const succeeded = crypter.compare(wrongPlainTexto, hashed);
        expect(succeeded).toEqual(false);
      
      }
    );
  
  }
);
