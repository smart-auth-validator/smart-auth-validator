export type RuleMessage = {
  min?: string;
  max?: string;
  regex?: string;
};

export type FieldRule = {
  min?: number;
  max?: number;
  regex?: RegExp;
  messages?: Partial<{
    required: string;
    min: string;
    max: string;
    pattern: string;
  }>;
};

export type Schema =
  | boolean
  | {
      min?: number;
      max?: number;
    };
export interface ValidationSchema {
  [field: string]: FieldRule | Schema | boolean;
}
export type ValidationErrorCode =
  | "REQUIRED"
  | "INVALID_TYPE"
  | "MIN_LENGTH"
  | "MAX_LENGTH"
  | "PATTERN";

export interface ValidationError {
  field: string;
  code: ValidationErrorCode;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}
