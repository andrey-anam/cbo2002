import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const FamilySchema = z.object({
    id: z
        .number()
        .openapi({ example: texts.examples.id.family , description: texts.descriptions.id }),
    sub_group_id: z
        .number()
        .openapi({ example: texts.examples.id.subGroupId, description: texts.descriptions.subgroupId }),
    label: z
        .string()
        .openapi({ example: texts.examples.label.family, description: texts.descriptions.label })
}).openapi('Família');

export type TFamily = z.infer<typeof FamilySchema>;

