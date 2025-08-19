import { BigGroupService } from "../services/big_group.service";
import { Request, Response } from "express";
import { getOffset, getTotalPages, texts } from "../../../infra/utils";
import {
    BigGroupFindAllResponseSchema,
    BigGroupFindOneResponseSchema,
    ErrorResponseSchema,
    TBigGroupFindAllResponse,
    TBigGroupFindOneResponse,
    TErrorResponse,
    TPagination
} from "../../../infra/docs/schemas";
import { TBigGroup } from "../domain/big_group.domain";
import {
    openApiRegistry,
    PBigGroupIdParam,
    QPageParams,
    QPerPageParams,
    QSearchParamsBigGroupSchema
} from "../../../infra/docs/openapi_config";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// Define as operações OpenAPI para BigGroup
openApiRegistry.registerPath({
    method: 'get',
    path: '/big-groups',
    tags: ['Grande Grupo'],
    summary: 'Lista todos os Grandes Grupos',
    description: 'Retorna uma lista paginada de todos os Grandes Grupos.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams
        })
    },
    responses: {
        200: {
            description: 'Lista de Grandes Grupos',
            content: {
                'application/json': {
                    schema: BigGroupFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhum Grande Grupo encontrado',
        },
        500: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        default: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

openApiRegistry.registerPath({
    method: 'get',
    path: '/big-groups/search',
    tags: ['Grande Grupo'],
    summary: 'Lista todos os Grandes Grupos, de acordo com o filtro de pesquisa.',
    description: 'Retorna uma lista paginada de todos os Grandes Grupos, de acordo com o filtro de pesquisa.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            q: QSearchParamsBigGroupSchema
        })
    },
    responses: {
        200: {
            description: 'Lista de Grandes Grupos',
            content: {
                'application/json': {
                    schema: BigGroupFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhum Grande Grupo encontrado',
        },
        500: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        default: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

openApiRegistry.registerPath({
    method: 'get',
    path: '/big-groups/{id}',
    tags: ['Grande Grupo'],
    summary: 'Busca um Grande Grupo por ID',
    description: 'Retorna um Grande Grupo específico pelo seu ID.',
    request: {
        params: z.object({
            id: PBigGroupIdParam
        }),
    },
    responses: {
        200: {
            description: 'Grande Grupo encontrado',
            content: {
                'application/json': {
                    schema: BigGroupFindOneResponseSchema,
                },
            },
        },
        400: {
            description: 'ID inválido',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        404: {
            description: 'Grande Grupo não encontrado',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        500: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        default: {
            description: 'Erro interno do servidor',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});

export class BigGroupController {
    constructor(private readonly bigGroupSvc: BigGroupService) { }

    async findAll(req: Request, res: Response) {

        try {
            const {
                page = 1,
                perPage = 100
            } = req.query

            const opts = {
                limit: perPage,
                offset: getOffset(page as number, perPage as number)
            }

            const {
                data,
                total: totalItems
            } = await this.bigGroupSvc.findAll(opts);


            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TBigGroupFindAllResponse = {
                success: true,
                message: texts.messages.success.bigGroup.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();

        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.bigGroup.get.plural,
                cause
            };

            console.error('Error during get Big Groups, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TBigGroupFindOneResponse;
        let errorResponse: TErrorResponse;
        try {
            const {
                id
            } = req.params

            if (!id) {
                errorResponse = {
                    success: false,
                    code: 'INVALID_ID',
                    message: texts.messages.error.invalidId
                };
                res.status(400).json(errorResponse).end();
            }

            const data = await this.bigGroupSvc.findOneById(Number(id));

            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.bigGroup.get.singular
                };

                res.status(404).json(errorResponse).end();
            }

            successResponse = {
                success: true,
                message: texts.messages.success.bigGroup.get.singular,
                data: data as TBigGroup
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Big Group, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }

    async searchByLabel(req: Request, res: Response) {
        let errorResponse: TErrorResponse;
        let successResponse: TBigGroupFindAllResponse;
        try {
            const {
                page = 1,
                perPage = 100,
                q
            } = req.query;

            const opts: { limit: number, offset: number, match?: any } = {
                limit: Number(perPage),
                offset: getOffset(page as number, perPage as number)
            }

            if (!q || typeof q !== 'string' || q.trim() === '') {
                errorResponse = {
                    success: false,
                    code: 'INVALID_QUERY',
                    message: 'Por favor, forneça um termo de pesquisa válido.'
                }

                return res.status(400).json(errorResponse).end();
            }

            const regex = new RegExp(q.trim(), 'i');

            opts.match = { label: regex };

            const {data, total: totalItems} = await this.bigGroupSvc.findAll(opts);

            if (data.length <= 0) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.bigGroup.get.plural
                };
                
                return res.status(404).json(errorResponse).end();
            }

            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            successResponse = {
                success: true,
                message: texts.messages.success.bigGroup.get.plural,
                data,
                pagination
            }

            return res.status(200).json(successResponse).end();

        } catch (cause) {
            errorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during search Big Groups, controller', JSON.stringify(errorResponse, null, 2));
            return res.status(500).json(errorResponse).end();
        }
    }
}