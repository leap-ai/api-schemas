import { z } from "zod";
import { RegexForIds } from "../utils/regexForIds";

export const BulkRunZodApiSchema = z.object({
  id: z
    .string()
    .regex(RegexForIds.bulkRunId.regex, RegexForIds.bulkRunId.errorMessage),
  created_at: z.string(),
  version_id: z.string(),
  workflow_id: z.string(),
  status: z.enum(["completed", "running", "failed", "queued", "cancelled"]),
  input_csv_url: z.string().url(),
  output_csv_url: z.string().url().nullable(),
  error: z.string().nullable(),
  row_count: z.number().positive(),
});

export type BulkRunApiType = z.infer<typeof BulkRunZodApiSchema>;
