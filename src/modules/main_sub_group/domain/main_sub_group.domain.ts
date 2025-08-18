import { z } from "zod";
import texts from "../../../infra/utils/texts.json";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);


export const MainSubGroupSchema = z.object({
    id: z
        .number()
        .openapi({ example: texts.examples.id.mainSubGroup, description: texts.descriptions.id }),
    big_group_id: z
        .number()
        .openapi({ example: texts.examples.id.bigGroup, description: texts.descriptions.bigGroupId }),
    label: z
        .string()
        .openapi({ example: texts.examples.label.mainSubGroup, description: texts.descriptions.label })
}).openapi('Sub Grupo Principal');

export type TMainSubGroup = z.infer<typeof MainSubGroupSchema>;
