import { WorkflowRunApiType, WorkflowRunZodApiSchema } from "./schemas";
import { validateObjectAgainstSchema } from "./utils/validateSchema";

describe("WorkflowRunZodSchema validation", () => {
  const validWorkflowRunObject: WorkflowRunApiType = {
    id: "rnp_cVa3GFiUwV8pR8mr3F",
    version_id: "version_456",
    status: "completed",
    created_at: "2021-02-02",
    started_at: "2021-02-02T10:00:00Z",
    ended_at: "2021-02-02T11:00:00Z",
    workflow_id: "workflow_def",
    error: null,
    input: { key: "value" },
    output: "Workflow output",
  };

  it("should validate correctly with a fully valid object", () => {
    const validationResult = validateObjectAgainstSchema(
      validWorkflowRunObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with an invalid id format", () => {
    const invalidIdObject = {
      id: "invalid_id_format",
      version_id: "version_456",
      status: "completed",
      created_at: "2021-02-02",
      started_at: "2021-02-02T10:00:00Z",
      ended_at: "2021-02-02T11:00:00Z",
      workflow_id: "workflow_def",
      error: null,
      input: { key: "value" },
      output: "Workflow output",
    };
    const validationResult = validateObjectAgainstSchema(
      invalidIdObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should validate correctly with valid statuses including 'queued' and 'cancelled'", () => {
    const validStatuses = ["completed", "processing", "queued", "cancelled"];
    validStatuses.forEach((status) => {
      const statusObject = {
        ...validWorkflowRunObject,
        status: status,
      };
      const validationResult = validateObjectAgainstSchema(
        statusObject,
        WorkflowRunZodApiSchema
      );
      expect(validationResult.valid).toBe(true);
    });
  });

  it("should fail validation with an invalid status", () => {
    const invalidStatusObject = {
      ...validWorkflowRunObject,
      status: "invalid_status", // Invalid status
    };
    const validationResult = validateObjectAgainstSchema(
      invalidStatusObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should allow nullable fields to be null", () => {
    const nullableFieldsObject = {
      ...validWorkflowRunObject,
      started_at: null,
      ended_at: null,
      error: null,
      input: null,
      output: null,
    };
    const validationResult = validateObjectAgainstSchema(
      nullableFieldsObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with non-nullable fields being null", () => {
    const nonNullableFieldsObject = {
      ...validWorkflowRunObject,
      id: null, // Non-nullable field
    };
    const validationResult = validateObjectAgainstSchema(
      nonNullableFieldsObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });

  it("should validate correctly with any type for output", () => {
    const validOutputObject = {
      ...validWorkflowRunObject,
      output: { message: "This is a valid output" }, // Valid any type output
    };
    const validationResult = validateObjectAgainstSchema(
      validOutputObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(true);
  });

  it("should fail validation with incorrect input type", () => {
    const invalidInputObject = {
      ...validWorkflowRunObject,
      input: "This is an invalid input type", // Invalid input type
    };
    const validationResult = validateObjectAgainstSchema(
      invalidInputObject,
      WorkflowRunZodApiSchema
    );
    expect(validationResult.valid).toBe(false);
  });
});
