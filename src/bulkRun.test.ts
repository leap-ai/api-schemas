import { BulkRunApiType, BulkRunZodApiSchema } from "./schemas";
import { validateObjectAgainstSchema } from "./utils/validateSchema";

describe("BulkRunZodSchema validation", () => {
  const validObject: BulkRunApiType = {
    id: "bulk_hdZB4xJAjDxDtjo8MaVmUDi3",
    created_at: "2021-01-01",
    version_id: "456",
    workflow_id: "789",
    status: "completed",
    input_csv_url: "https://example.com",
    output_csv_url: "https://example.com/output.csv",
    error: null,
    row_count: 100,
  };

  it("should validate correctly with a fully valid object", () => {
    const validationResult = validateObjectAgainstSchema(
      validObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with an invalid id format", () => {
    const invalidIdObject = {
      ...validObject,
      id: "123", // Invalid ID format
    };
    const validationResult = validateObjectAgainstSchema(
      invalidIdObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should fail validation with an invalid status", () => {
    const invalidStatusObject = {
      ...validObject,
      status: "processing", // Invalid status
    };
    const validationResult = validateObjectAgainstSchema(
      invalidStatusObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should validate correctly that status is one of 'completed', 'running', 'failed', 'queued', 'cancelled'", () => {
    const statuses = ["completed", "running", "failed", "queued", "cancelled"];
    statuses.forEach((status) => {
      const statusObject = {
        ...validObject,
        status: status,
      };
      const validationResult = validateObjectAgainstSchema(
        statusObject,
        BulkRunZodApiSchema
      );
      expect(validationResult.valid).toBe(true);
    });
  });

  it("should fail validation if status is not one of 'completed', 'running', 'failed', 'queued', 'cancelled'", () => {
    const invalidStatusObject = {
      ...validObject,
      status: "invalid_status", // Not a valid status
    };
    const validationResult = validateObjectAgainstSchema(
      invalidStatusObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should fail validation with a negative row_count", () => {
    const invalidRowCountObject = {
      ...validObject,
      row_count: -1,
    };
    const validationResult = validateObjectAgainstSchema(
      invalidRowCountObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should allow nullable error field", () => {
    const nullableErrorObject = {
      ...validObject,
      error: null, // Valid nullable error
    };
    const validationResult = validateObjectAgainstSchema(
      nullableErrorObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with non-nullable error field of wrong type", () => {
    const nonNullableErrorObject = {
      ...validObject,
      error: 404, // Invalid error type, should be string or null
    };
    const validationResult = validateObjectAgainstSchema(
      nonNullableErrorObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should validate correctly with any output type", () => {
    const validOutputObject = {
      ...validObject,
      output: { message: "This is a valid output" }, // Valid any type output
    };
    const validationResult = validateObjectAgainstSchema(
      validOutputObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should validate correctly with a valid output_csv_url", () => {
    const validOutputCsvUrlObject = {
      ...validObject,
      output_csv_url: "https://example.com/valid_output.csv", // Valid output_csv_url
    };
    const validationResult = validateObjectAgainstSchema(
      validOutputCsvUrlObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with an invalid output_csv_url", () => {
    const invalidOutputCsvUrlObject = {
      ...validObject,
      output_csv_url: "not a valid url", // Invalid output_csv_url
    };
    const validationResult = validateObjectAgainstSchema(
      invalidOutputCsvUrlObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should validate correctly with a valid input_csv_url", () => {
    const validInputCsvUrlObject = {
      ...validObject,
      input_csv_url: "https://example.com/valid_input.csv", // Valid input_csv_url
    };
    const validationResult = validateObjectAgainstSchema(
      validInputCsvUrlObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with an invalid input_csv_url", () => {
    const invalidInputCsvUrlObject = {
      ...validObject,
      input_csv_url: "not a valid url", // Invalid input_csv_url
    };
    const validationResult = validateObjectAgainstSchema(
      invalidInputCsvUrlObject,
      BulkRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });
});
