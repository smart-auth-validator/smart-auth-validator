export type RuleMessage = {
  required?: string;
  min?: string;
  max?: string;
  pattern?: string;
};

export type FieldRule = {
  min?: number;
  max?: number;
  regex?: RegExp;
  messages?: Partial<Record<ValidationErrorCode, string>>; 
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
  | "PATTERN"
  | "WEAK_PASSWORD"
  | "INVALID_PHONE"
  | "INVALID_URL"
  | "INVALID_IMAGE"
  | "IMAGE_TOO_LARGE"
  | "UNSUPPORTED_IMAGE_TYPE";


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

export interface ImagePayload {
  url: string;
  mimeType?: string;
  sizeKB?: number;
}
