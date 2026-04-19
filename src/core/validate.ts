import {
  applyRule,
  createError,
  FieldRule,
  RULES,
  ValidationError,
  ValidationResult,
  ValidationSchema,
} from "../shared";

export function validate<T extends Record<string, unknown>>(
  schema: ValidationSchema,
  data: T
): ValidationResult<Partial<T>> {
  const errors: ValidationError[] = [];
  const validData: Partial<T> = {};

  for (const field of Object.keys(schema) as Array<keyof T>) {
    const rule = resolveRule(field as string, schema[field as string]);

    if (!rule) {
      errors.push(createError(field as string, "INVALID_TYPE"));
      continue;
    }

    const rawValue = data[field];
    const transformedValue = transformValue(rawValue, rule);

    const error = applyRule(field as string, transformedValue, rule);

    if (error) {
      errors.push(error);
      continue;
    }

    validData[field] = transformedValue;
  }

  return buildResult(errors, validData);
}

function resolveRule(
  field: string,
  schemaRule: ValidationSchema[string]
): FieldRule | undefined {
  if (typeof schemaRule === "boolean") {
    return RULES[field];
  }

  return RULES[field] ?? (schemaRule as FieldRule);
}

function transformValue<T>(
  value: T,
  rule: FieldRule
): T {
  if (rule.transform && value !== undefined) {
    return rule.transform(value) as T;
  }
  return value;
}

function buildResult<T>(
  errors: ValidationError[],
  data: Partial<T>
): ValidationResult<Partial<T>> {
  return errors.length > 0
    ? { success: false, errors }
    : { success: true, data };
}