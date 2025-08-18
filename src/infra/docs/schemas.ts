import { z } from 'zod';
import {extendZodWithOpenApi} from '@asteasolutions/zod-to-openapi';

import { FamilySchema } from "../../modules/family/domain/family.domain";
import { BigGroupSchema } from "../../modules/big_group/domain/big_group.domain";
import { SubGroupSchema } from "../../modules/sub_group/domain/sub_group.domain";
import { MainSubGroupSchema } from "../../modules/main_sub_group/domain/main_sub_group.domain";
import { OccupationSchema } from "../../modules/occupation/domain/occupation.domain";
import { SynonymousSchema } from "../../modules/synonymous/domain/synonymous.domain";

extendZodWithOpenApi(z);

// --- Common Schemas ---
export const PaginationSchema =
        z
            .object({
                page: z
                    .number()
                    .default(1)
                    .openapi({ example: 1, description: 'Página atual.', default: 1 }),
                perPage: z
                    .number()
                    .default(100)
                    .openapi({ example: 100, description: 'Quantidade de itens por página.', default: 100 }),
                items: z
                    .number()
                    .openapi({ example: 50, description: 'Quantidade de itens na página atual.' }),
                totalItems: z
                    .number()
                    .openapi({ example: 1500, description: 'Quantidade total de itens existentes.' }),
                totalPages: z
                    .number()
                    .openapi({ example: 5, description: 'Quantidade total de páginas.' }),
                hasNext: z
                    .boolean()
                    .openapi({ example: true, description: 'Indicador de próxima página.' })
            })
            .openapi('Esquema de paginação de respostas');

export const PaginationQuerySchema =
    z
        .object({
            page: z
                .coerce
                .number()
                .int()
                .optional()
                .default(1)
                .openapi({
                    description: 'Número da página',
                    example: 1,
                    default: 1,
                    param: {
                        name: 'page',
                        in: 'query',
                        example: 1,
                        description: 'Número da página atual.',
                    }
                }),
            perPage: z
                .coerce
                .number()
                .int()
                .optional()
                .default(100)
                .openapi({
                    description: 'Quantidade de itens por página',
                    example: '100',
                    default: 100,
                    param: {
                        name: 'perPage',
                        in: 'query',
                        example: 100,
                        description: 'Quantidade de itens por página.',
                    }
                }),
        })
        .openapi('[Query] Parâmetros de paginação');

export const PaginatedResponseSchema =
    z
        .object({
            success: z
                .boolean()
                .default(true)
                .openapi({ example: true, description: 'Indicador de sucesso do retorno.' }),
            message: z
                .string()
                .openapi({ example: 'Ocupações listadas com sucesso.', description: 'Mensagem da resposta.' }),
            data: z
                .array(z.any()),
            pagination: PaginationSchema
                .openapi({
                    example: JSON.stringify({
                        page: 1,
                        perPage: 100,
                        items: 50,
                        totalItems: 1500,
                        totalPages: 5,
                        hasNext: true
                    }, null, 2),
                    description: 'Dados da resposta.'
                }),
        })
        .openapi({description: 'Resposta paginada genérica'});

export const SingleResponseSchema =
    z
        .object({
            success: z
                .boolean()
                .default(true)
                .openapi({ example: true, description: 'Indicador de sucesso do retorno.' }),
            message: z
                .string()
                .openapi({ example: 'Ocupação encontrada com sucesso!', description: 'Mensagem da resposta.'}),
            data: z.any(),
        })
        .openapi({description: 'Resposta de item único genérica'});

export const ErrorResponseSchema =
    z
        .object({
            success: z
                .boolean()
                .default(false)
                .openapi({ example: false, description: 'Indicador de erro do retorno.' }),
            code: z
                .string()
                .optional()
                .openapi({ example: 'NOT_FOUND', description: 'Código descritivo do erro.' }),
            message: z
                    .string()
                    .openapi({ example: 'Não foi possível encontrar a ocupação.', description: 'Mensagem de erro.'}),
            cause: z
                .any()
                .optional()
                .openapi({ example: 'Qualquer descrição', description: 'Qualquer informação adicional sobre o erro.'}),
        })
        .openapi({description: 'Resposta de erro genérica'});

export const SuccessResponseSchema =
    z
        .union([
            SingleResponseSchema,
            PaginatedResponseSchema,
        ])
        .openapi('Resposta de sucesso genérica');

export const ResponseSchema =
    z
        .union([
            SuccessResponseSchema,
            ErrorResponseSchema,
        ])
        .openapi('Resposta genérica')

// --- Family Schemas ---
export const FamilyFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(FamilySchema),
        })
        .openapi({title: 'Esquema de resposta de várias Famílias'});

export const FamilyFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: FamilySchema,
        })
        .openapi({title: 'Esquema de resposta de uma única Família'});

export const BigGroupFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(BigGroupSchema),
        })
        .openapi({title: 'Esquemma de resposta de vários Grandes Grupos'});

export const BigGroupFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: BigGroupSchema,
        })
        .openapi({title: 'Esquema de resposta de um único Grande Grupo'});


// --- SubGroup Schemas ---
export const SubGroupFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(SubGroupSchema),
        })
        .openapi({title: 'Esquema de resposta de vários Sub Grupos'});

export const SubGroupFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: SubGroupSchema,
        })
        .openapi({title: 'Esquema de resposta de um único Sub Grupo'});

// MainSubGroup Schemas
export const MainSubGroupFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(MainSubGroupSchema),
        })
        .openapi({title: 'Esquema de resposta de vários Sub Grupos Principais'});

export const MainSubGroupFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: MainSubGroupSchema,
        })
        .openapi({title: 'Esquema de resposta de um único Sub Grupo Principal'});

// Occupation Schemas
export const OccupationFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(OccupationSchema),
        })
        .openapi({title: 'Esquema de resposta de várias Ocupações'});

export const OccupationFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: OccupationSchema,
        })
        .openapi({title: 'Esquema de resposta de uma única Ocupação'});

// Synonymous Schemas
export const SynonymousFindAllResponseSchema =
    PaginatedResponseSchema
        .extend({
            data: z.array(SynonymousSchema),
        })
        .openapi({title: 'Esquema de resposta de vários Sinônimos'});

export const SynonymousFindOneResponseSchema =
    SingleResponseSchema
        .extend({
            data: SynonymousSchema,
        })
        .openapi({title: 'Esquema de resposta de um único Sinônimo'});


export type TPagination = z.infer<typeof PaginationSchema>;

export type TPaginationQuery = z.infer<typeof PaginationQuerySchema>;

export type TPaginatedResponse = z.infer<typeof PaginatedResponseSchema>;

export type TSingleResponse = z.infer<typeof SingleResponseSchema>;

export type TErrorResponse = z.infer<typeof ErrorResponseSchema>;

export type TSuccessResponse = z.infer<typeof SuccessResponseSchema>;

export type TResponse = z.infer<typeof ResponseSchema>;

export type TFamilyFindAllResponse = z.infer<typeof FamilyFindAllResponseSchema>;

export type TFamilyFindOneResponse = z.infer<typeof FamilyFindOneResponseSchema>;

export type TBigGroupFindAllResponse = z.infer<typeof BigGroupFindAllResponseSchema>;

export type TBigGroupFindOneResponse = z.infer<typeof BigGroupFindOneResponseSchema>;

export type TSubGroupFindAllResponse = z.infer<typeof SubGroupFindAllResponseSchema>;

export type TSubGroupFindOneResponse = z.infer<typeof SubGroupFindOneResponseSchema>;

export type TMainSubGroupFindAllResponse = z.infer<typeof MainSubGroupFindAllResponseSchema>;

export type TMainSubGroupFindOneResponse = z.infer<typeof MainSubGroupFindOneResponseSchema>;

export type TOccupationFindAllResponse = z.infer<typeof OccupationFindAllResponseSchema>;

export type TOccupationFindOneResponse = z.infer<typeof OccupationFindOneResponseSchema>;

export type TSynonymousFindAllResponse = z.infer<typeof SynonymousFindAllResponseSchema>;

export type TSynonymousFindOneResponse = z.infer<typeof SynonymousFindOneResponseSchema>;

export {
    FamilySchema,
    BigGroupSchema,
    SubGroupSchema,
    MainSubGroupSchema,
    OccupationSchema,
    SynonymousSchema,
}