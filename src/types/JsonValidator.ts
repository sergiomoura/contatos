import { type ValidationResult } from './ValidationResult';

export interface JsonValidator {
  validate: (schema: Record<string, unknown>, data: any) => ValidationResult
}
