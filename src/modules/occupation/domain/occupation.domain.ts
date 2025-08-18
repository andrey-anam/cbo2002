import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const OccupationSchema = z.object({
    id: z
        .number()
        .openapi({ example: texts.examples.id.occupationId, description: texts.descriptions.id }),
    family_id: z
        .number()
        .openapi({ example: texts.examples.id.family, description: texts.descriptions.familyId }),
    label: z
        .string()
        .openapi({ example: texts.examples.label.occupation, description: texts.descriptions.label })
}).openapi('Ocupação');

export type TOccupation = z.infer<typeof OccupationSchema>;
