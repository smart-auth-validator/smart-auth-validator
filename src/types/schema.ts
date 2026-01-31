export type RuleMessage = {
  required?: string;
  min?: string;
  max?: string;
  pattern?: string;
};

export type FieldRule = {
  min?: number;             // Minimum length for string
  max?: number;             // Maximum length for string
  regex?: RegExp;           // Regex pattern to validate
  messages?: Partial<Record<ValidationErrorCode, string>>; // Custom error messages
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
  | "REQUIRED"       // Field is missing
  | "INVALID_TYPE"   // Field type is incorrect
  | "MIN_LENGTH"     // Field length < min
  | "MAX_LENGTH"     // Field length > max
  | "PATTERN"        // Field does not match regex
  | "WEAK_PASSWORD"  // Password does not meet strength requirements
  | "INVALID_PHONE"  // Phone number is invalid
  | "INVALID_URL";   // URL is invalid

export interface ValidationError {
  field: string;              // Field name
  code: ValidationErrorCode;  // Error type
  message: string;            // Human-readable message
}

export interface ValidationResult<T> {
  success: boolean;           // True if no errors
  data?: T;                   // Validated data (only present if success)
  errors?: ValidationError[]; // Array of errors (only present if !success)
}
