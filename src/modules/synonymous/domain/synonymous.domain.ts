import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const SynonymousSchema = z.object({
    occupation_id: z
        .number()
        .openapi({ example: texts.examples.id.occupationId, description: texts.descriptions.occupationId }),
    label: z
        .string()
        .openapi({ example: texts.examples.label.occupation, description: texts.descriptions.label })
}).openapi('Sinônimo');

export type TSynonymous = z.infer<typeof SynonymousSchema>;
