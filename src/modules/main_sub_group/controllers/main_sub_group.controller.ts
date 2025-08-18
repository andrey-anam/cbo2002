import { MainSubGroupService } from "../services/main_sub_group.service";
import { Request, Response } from "express";
import { getTotalPages, getOffset, texts } from "../../../infra/utils";
import {
    MainSubGroupFindAllResponseSchema,
    MainSubGroupFindOneResponseSchema,
    ErrorResponseSchema, TPagination, TMainSubGroupFindAllResponse, TErrorResponse, TMainSubGroupFindOneResponse
} from "../../../infra/docs/schemas";
import { openApiRegistry, PMainSubGroupIdParam, QBigGroupIdParam, QPageParams, QPerPageParams } from "../../../infra/docs/openapi_config";
import { z } from "zod";
import { TMainSubGroup } from "../domain/main_sub_group.domain";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// Define as operações OpenAPI para MainSubGroup
openApiRegistry.registerPath({
    method: 'get',
    path: '/main-sub-groups',
    tags: ['Sub Grupo Principal'],
    summary: 'Lista todos os Sub Grupos Principais',
    description: 'Retorna uma lista paginada de todos os Sub Grupos Principais.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            bigGroupId: QBigGroupIdParam
        })
    },
    responses: {
        200: {
            description: 'Lista de Sub Grupos Principais',
            content: {
                'application/json': {
                    schema: MainSubGroupFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhum Sub Grupo Principal encontrado',
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
    path: '/main-sub-groups/{id}',
    tags: ['Sub Grupo Principal'],
    summary: 'Busca um Sub Grupo Principal por ID',
    description: 'Retorna um Sub Grupo Principal específico pelo seu ID.',
    request: {
        params: z.object({
            id: PMainSubGroupIdParam
        }),
    },
    responses: {
        200: {
            description: 'Sub Grupo Principal encontrado',
            content: {
                'application/json': {
                    schema: MainSubGroupFindOneResponseSchema,
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
            description: 'Sub Grupo Principal não encontrado',
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


export class MainSubGroupController {
    constructor(private readonly mainSubGroupSvc: MainSubGroupService) { }

    async findAll(req: Request, res: Response) {

        try {
            const {
                page = 1,
                perPage = 100,
                bigGroupId
            } = req.query

            const opts: {offset: number, limit: number, match?: any} = {
                limit: Number(perPage),
                offset: getOffset(page as number, perPage as number)
            }

            if (bigGroupId) {
                const match = {
                    big_group_id: bigGroupId
                }

                opts.match = match
            }

            const {
                data,
                total: totalItems
            } = await this.mainSubGroupSvc.findAll(opts);


            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TMainSubGroupFindAllResponse = {
                success: true,
                message: texts.messages.success.mainSubGroup.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();

        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.mainSubGroup.get.plural,
                cause
            };

            console.error('Error during get Main Sub Group, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TMainSubGroupFindOneResponse;
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

            const data = await this.mainSubGroupSvc.findOneById(Number(id));

            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.mainSubGroup.get.singular
                };

                res.status(404).json(errorResponse).end();
            }

            successResponse = {
                success: true,
                message: texts.messages.success.mainSubGroup.get.singular,
                data: data as TMainSubGroup
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Main Sub Group, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }
}