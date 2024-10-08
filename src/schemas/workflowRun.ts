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
  status: z.enum(["completed", "running", "failed", "queued", "cancelled"]),
  created_at: z.string(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable(),
  workflow_id: z.string(),
  error: z.string().nullable(),
  input: z.record(z.string(), z.unknown()).nullable(),
  output: z.unknown().nullable(),
});

export type WorkflowRunApiType = z.infer<typeof WorkflowRunZodApiSchema>;
