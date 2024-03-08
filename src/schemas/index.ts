import { BulkRunApiType, BulkRunZodApiSchema } from "./bulkRun";
import { WorkflowRunZodApiSchema, WorkflowRunApiType } from "./workflowRun";

export {
  BulkRunZodApiSchema,
  WorkflowRunZodApiSchema,
  BulkRunApiType,
  WorkflowRunApiType,
};

export type AllowedZodSchemas =
  | typeof BulkRunZodApiSchema
  | typeof WorkflowRunZodApiSchema;
