import { z } from "zod";

type ValidationError = {
  message: string;
  path: (string | number)[];
  type: string;
};

const validateObjectAgainstSchema = <T>(
  object: unknown,
  schema: z.ZodType<T, any, any>
): { valid: boolean; errors?: ValidationError[] } => {
  try {
    // The object is now validated against the schema and is treated as type T upon success
    schema.parse(object);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map((issue) => ({
        message: issue.message,
        path: issue.path,
        type: issue.code,
      }));
      return { valid: false, errors };
    }
    return {
      valid: false,
      errors: [
        {
          message: "An unexpected error occurred during validation.",
          path: [],
          type: "unknown",
        },
      ],
    };
  }
};

export { validateObjectAgainstSchema };
