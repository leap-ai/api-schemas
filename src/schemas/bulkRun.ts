import { z } from "zod";
import { RegexForIds } from "../utils/regexForIds";

export const BulkRunZodApiSchema = z.object({
  id: z
    .string()
    .regex(RegexForIds.bulkRunId.regex, RegexForIds.bulkRunId.errorMessage),
  created_at: z.string(),
  version_id: z.string(),
  workflow_id: z.string(),
  status: z.enum(["completed", "running", "failed"]),
  input_csv_url: z.string(),
  error: z.string().nullable(),
  row_count: z.number().positive(),
  output: z.any(),
});

export type BulkRunApiType = z.infer<typeof BulkRunZodApiSchema>;
