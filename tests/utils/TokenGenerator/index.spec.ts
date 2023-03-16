import { tokenGenerator } from '@/utils/TokenGenerator';
import { describe, expect, test } from 'vitest';

describe(
  'Token Generator Specification',
  () => {

    const payload = { x: 1, y: 2 };
    const token = tokenGenerator.create(payload);

    test('Should generate token', () => {

      expect(token).toBeTypeOf('string');
    
    });

    test('Generated token should be valid', () => {

      expect(tokenGenerator.validate(token)).toEqual(true);
    
    });

    test('Should decode token correctly', () => {

      const decoded = tokenGenerator.decode(token);
      expect(decoded).toEqual(payload);
    
    });
  
  }
);
