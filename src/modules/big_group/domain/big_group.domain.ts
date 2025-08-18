import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const BigGroupSchema = z.object({
    id: z
        .number()
        .openapi({ example: texts.examples.id.bigGroup, description:  texts.descriptions.id}),
    label: z
        .string()
        .openapi({ example: texts.examples.label.bigGroup, description: texts.descriptions.label })
}).openapi('Grande Grupo');

export type TBigGroup = z.infer<typeof BigGroupSchema>;

