import { Tokenizer } from '@/utils/Tokenizer';
import { describe, expect, test } from 'vitest';

describe(
  'Token Generator Specification',
  () => {

    const payload = { x: 1, y: 2 };
    const token = Tokenizer.create(payload);

    test('Should generate token', () => {

      expect(token).toBeTypeOf('string');
    
    });

    test('Generated token should be valid', () => {

      expect(Tokenizer.validate(token)).toEqual(true);
    
    });

    test('Should decode token correctly', () => {

      const decoded = Tokenizer.decode(token);
      expect(decoded).toEqual(payload);
    
    });
  
  }
);
