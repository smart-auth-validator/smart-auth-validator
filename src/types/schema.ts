export type ValidationErrorCode =
  | "REQUIRED"
  | "INVALID_TYPE"
  | "MIN_LENGTH"
  | "MAX_LENGTH"
  | "PATTERN"
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

export type FieldRule = {
  min?: number;
  max?: number;
  regex?: RegExp;
  transform?: (value: unknown) => unknown;
  messages?: Partial<Record<ValidationErrorCode, string>>;
};

export type ValidationSchema = {
  [field: string]: true | FieldRule;
};

type InferRule<T> =
  T extends { transform: (v: any) => infer R }
    ? R
    : T extends true
    ? unknown
    : string;

export type InferSchema<T extends ValidationSchema> = {
  [K in keyof T]: InferRule<T[K]>;
};