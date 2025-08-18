import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const SubGroupSchema = z.object({
    id: z
        .number()
        .openapi({ example: texts.examples.id.subGroupId, description: texts.descriptions.id }),
    main_sub_group_id: z
        .number()
        .openapi({ example: texts.examples.id.mainSubGroup, description: texts.descriptions.mainSubGroupId }),
    label: z
        .string()
        .openapi({ example: texts.examples.label.subGroup, description: texts.descriptions.label })
}).openapi('Sub Grupo');

export type TSubGroup = z.infer<typeof SubGroupSchema>;
