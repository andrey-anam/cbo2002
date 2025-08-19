import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import {
    PaginationQuerySchema,
    FamilyFindAllResponseSchema,
    FamilyFindOneResponseSchema,
    BigGroupFindAllResponseSchema,
    BigGroupFindOneResponseSchema,
    SubGroupFindAllResponseSchema,
    SubGroupFindOneResponseSchema,
    MainSubGroupFindAllResponseSchema,
    MainSubGroupFindOneResponseSchema,
    OccupationFindAllResponseSchema,
    OccupationFindOneResponseSchema,
    SynonymousFindAllResponseSchema,
    SynonymousFindOneResponseSchema,
    ErrorResponseSchema
} from './schemas';

import { z } from "zod";
import { texts } from '../utils';

extendZodWithOpenApi(z)

export const openApiRegistry = new OpenAPIRegistry();

export const PBigGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID do Grande Prupo',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: 0,
                    description: 'ID do Grande Grupo.'
                })
        );

export const QBigGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Query] ID do Grande Prupo',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'bigGroupId',
                        in: 'query'
                    },
                    example: 0,
                    description: 'ID do Grande Grupo.'
                })
        );

export const PMainSubGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID do Sub Grupo Principal',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: 1,
                    description: 'ID do Sub Grupo Principal.'
                })
        );

export const QMainSubGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Query] ID do Sub Grupo Principal',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'mainSubGroupId',
                        in: 'query',
                    },
                    example: 1,
                    description: 'ID do Sub Grupo Principal.'
                })
        );

export const PSubGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID do Sub Grupo',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: 10,
                    description: 'ID do Sub Grupo.'
                })
        );

export const QSubGroupIdParam =
    openApiRegistry
        .registerParameter(
            '[Query] ID do Sub Grupo',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'subGroupId',
                        in: 'query'
                    },
                    example: 10,
                    description: 'ID do Sub Grupo.'
                })
        );

export const PFamilyIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID da Família',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: 101,
                    description: 'ID da Família'
                })
        );

export const QFamilyIdParam =
    openApiRegistry
        .registerParameter(
            '[Query] ID da Família',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'familyId',
                        in: 'query'
                    },
                    example: 101,
                    description: 'ID da Família'
                })
        );

export const POccupationIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID da Ocupação',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: 10105,
                    description: 'ID da Ocupação.'
                })
        );

export const QOccupationIdParam =
    openApiRegistry
        .registerParameter(
            '[Query] ID da Ocupação',
            z
                .coerce
                .number()
                .int()
                .openapi({
                    param: {
                        name: 'occupationId',
                        in: 'query'
                    },
                    example: 10105,
                    description: 'ID da Ocupação.'
                })
        );

export const PSynonymousIdParam =
    openApiRegistry
        .registerParameter(
            '[Path] ID do Sinônimo',
            z
                .string()
                .openapi({
                    param: {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                    example: '689ebf1cc80b161a2c06e33d',
                    description: 'ID do Sinônimo.'
                })
        );


export const QPageParams =
    openApiRegistry
        .registerParameter(
            '[Query] Page',
            z
                .coerce
                .number()
                .int()
                .default(1)
                .optional()
                .openapi({
                    param: {
                        name: 'page',
                        in: 'query'
                    },
                    example: 1,
                    description: 'Número da página para buscar',
                    default: 1
                })
        );



export const QPerPageParams =
    openApiRegistry
        .registerParameter(
            '[Query] PerPage',
            z
                .coerce
                .number()
                .int()
                .default(100)
                .optional()
                .openapi({
                    param: {
                        name: 'perPage',
                        in: 'query'
                    },
                    example: 100,
                    description: 'Quantidade de itens por página',
                    default: 100
                })
        );

export const QSearchParamsBigGroupSchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.bigGroup,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

export const QSearchParamsMainSubGroupSchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.mainSubGroup,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

export const QSearchParamsSubGroupSchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.subGroup,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

export const QSearchParamsFamilySchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.family,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

export const QSearchParamsOccupationSchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.occupation,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

export const QSearchParamsSynonymousSchema =
    z
        .string()
        .min(3, 'Termo de pesquisa deve ter pelo menos 3 caracteres')
        .max(100, 'Termo de pesquisa deve ter no máximo 100 caracteres')
        .trim()
        .openapi({
            param: {
                name: 'q',
                in: 'query',
                example: texts.examples.label.synonymous,
                required: true
            },
            description: 'Termo de pesquisa para buscar ocupações, famílias, etc.'
        })

// Register common schemas
export const QPaginationQuery =
    openApiRegistry
        .register(
            '[Query] Esquema de Paginação',
            PaginationQuerySchema
        );

export const SErrorResponse =
    openApiRegistry
        .register(
            'Esquema de resposta de Erro',
            ErrorResponseSchema
        );

// Register Family schemas
export const SFamilyFindAllResponse =
    openApiRegistry
        .register(
            'FamilyFindAllResponse',
            FamilyFindAllResponseSchema
        );
export const SFamilyFindOneResponse =
    openApiRegistry
        .register(
            'FamilyFindOneResponse',
            FamilyFindOneResponseSchema
        );

// Register BigGroup schemas
export const SBigGroupFindAllResponse =
    openApiRegistry
        .register(
            'BigGroupFindAllResponse',
            BigGroupFindAllResponseSchema
        );
export const SBigGroupFindOneResponse =
    openApiRegistry
        .register(
            'BigGroupFindOneResponse',
            BigGroupFindOneResponseSchema
        );

// Register SubGroup schemas
export const SSubGroupFindAllResponse =
    openApiRegistry
        .register(
            'SubGroupFindAllResponse',
            SubGroupFindAllResponseSchema
        );
export const SSubGroupFindOneResponse =
    openApiRegistry
        .register(
            'SubGroupFindOneResponse',
            SubGroupFindOneResponseSchema
        );

// Register MainSubGroup schemas
export const SMainSubGroupFindAllResponse =
    openApiRegistry
        .register(
            'MainSubGroupFindAllResponse',
            MainSubGroupFindAllResponseSchema
        );
export const SMainSubGroupFindOneResponse =
    openApiRegistry
        .register(
            'MainSubGroupFindOneResponse',
            MainSubGroupFindOneResponseSchema
        );

// Register Occupation schemas
export const SOccupationFindAllResponse =
    openApiRegistry
        .register(
            'OccupationFindAllResponse',
            OccupationFindAllResponseSchema
        );
export const SOccupationFindOneResponse =
    openApiRegistry
        .register(
            'OccupationFindOneResponse',
            OccupationFindOneResponseSchema
        );

// Register Synonymous schemas
export const SSynonymousFindAllResponse =
    openApiRegistry
        .register(
            'SynonymousFindAllResponse',
            SynonymousFindAllResponseSchema
        );
export const SSynonymousFindOneResponse =
    openApiRegistry
        .register(
            'SynonymousFindOneResponse',
            SynonymousFindOneResponseSchema
        );


export function generateSwaggerDocs(openApiRegistry: OpenAPIRegistry) {

    return new OpenApiGeneratorV3(openApiRegistry.definitions).generateDocument({
        openapi: '3.0.0',
        info: {
            title: 'CBO2002 API',
            version: '1.0.0',
            description: 'Documentação para consulta à estrutura do CBO (Cadastro Brasileiro de Ocupações)'
        },
        servers: [
            {
                url: '/api'
            }
        ]
    })

}