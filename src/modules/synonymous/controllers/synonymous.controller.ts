import { SynonymousService } from "../services/synonymous.service";
import { Request, Response } from "express";
import { getTotalPages, getOffset, texts } from "../../../infra/utils";
import {
    SynonymousFindAllResponseSchema,
    SynonymousFindOneResponseSchema,
    ErrorResponseSchema,
    TPagination,
    TSynonymousFindAllResponse,
    TErrorResponse,
    TSynonymousFindOneResponse
} from "../../../infra/docs/schemas";
import { openApiRegistry, PSynonymousIdParam, QOccupationIdParam, QPageParams, QPerPageParams } from "../../../infra/docs/openapi_config";
import { z } from "zod";
import { TSynonymous } from "../domain/synonymous.domain";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

// Define as operações OpenAPI para Synonymous
openApiRegistry.registerPath({
    method: 'get',
    path: '/synonymous',
    tags: ['Sinônimo'],
    summary: 'Lista todos os Sinônimos',
    description: 'Retorna uma lista paginada de todos os Sinônimos.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            occupationId: QOccupationIdParam
        })
    },
    responses: {
        200: {
            description: 'Lista de Sinônimos',
            content: {
                'application/json': {
                    schema: SynonymousFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhum Sinônimo encontrado',
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
    path: '/synonymous/{id}',
    tags: ['Sinônimo'],
    summary: 'Busca um Sinônimo por ID da Ocupação',
    description: 'Retorna os Sinônimos de uma Ocupação específica, de acordo com o ID da Ocupação.',
    request: {
        params: z.object({
            id: PSynonymousIdParam
        }),
    },
    responses: {
        200: {
            description: 'Sinônimo encontrado',
            content: {
                'application/json': {
                    schema: SynonymousFindOneResponseSchema,
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
            description: 'Sinônimo não encontrado',
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
    },
});


export class SynonymousController {
    constructor(private readonly synonymousSvc: SynonymousService) { }

    async findAll(req: Request, res: Response) {

        try {
            const {
                page = 1,
                perPage = 100,
                occupationId
            } = req.query

            const opts: {limit: number, offset: number, match?: any} = {
                limit: Number(perPage),
                offset: getOffset(page as number, perPage as number)
            }

            if (occupationId) {
                const match = {
                    occupation_id: Number(occupationId)
                }

                opts.match = match
            }

            const {
                data,
                total: totalItems
            } = await this.synonymousSvc.findAll(opts);


            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TSynonymousFindAllResponse = {
                success: true,
                message: texts.messages.success.synonymous.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();

        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.synonymous.get.plural,
                cause
            };

            console.error('Error during get Synonymous, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TSynonymousFindOneResponse;
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

            const data = await this.synonymousSvc.findOneById(String(id));

            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.synonymous.get.singular
                };

                res.status(404).json(errorResponse).end();
            }

            successResponse = {
                success: true,
                message: texts.messages.success.synonymous.get.singular,
                data: data as TSynonymous
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Synonymous, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }
}