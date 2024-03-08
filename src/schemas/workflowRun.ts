import { z } from "zod";
import { RegexForIds } from "../utils/regexForIds";

export const WorkflowRunZodApiSchema = z.object({
  id: z
    .string()
    .regex(
      RegexForIds.workflowPublishedRunsId.regex,
      RegexForIds.workflowPublishedRunsId.errorMessage
    ),
  version_id: z.string(),
  status: z.enum(["completed", "running", "failed"]),
  created_at: z.string(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable(),
  workflow_id: z.string(),
  error: z.string().nullable(),
  input: z.record(z.string(), z.any()).nullable(),
  output: z.unknown().nullable(),
});

export type WorkflowRunApiType = z.infer<typeof WorkflowRunZodApiSchema>;

// Make name of export more specific
