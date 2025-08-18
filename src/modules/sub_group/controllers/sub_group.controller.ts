import { SubGroupService } from "../services/sub_group.service";
import { Request, Response } from "express";
import { getTotalPages, getOffset, texts } from "../../../infra/utils";
import {
    SubGroupFindAllResponseSchema,
    SubGroupFindOneResponseSchema,
    ErrorResponseSchema, TPagination, TErrorResponse, TSubGroupFindAllResponse, TSubGroupFindOneResponse
} from "../../../infra/docs/schemas";
import {
    openApiRegistry,
    PSubGroupIdParam,
    QMainSubGroupIdParam,
    QPageParams,
    QPerPageParams
} from "../../../infra/docs/openapi_config";
import { z } from "zod";
import {TSubGroup} from "../domain/sub_group.domain";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

// Define as operações OpenAPI para SubGroup
openApiRegistry.registerPath({
    method: 'get',
    path: '/sub-groups',
    tags: ['Sub Grupo'],
    summary: 'Lista todos os Sub Grupos',
    description: 'Retorna uma lista paginada de todos os Sub Grupos.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            mainSubGroupId: QMainSubGroupIdParam
        })
    },
    responses: {
        200: {
            description: 'Lista de Sub Grupos',
            content: {
                'application/json': {
                    schema: SubGroupFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhum Sub Grupo encontrado',
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
    path: '/sub-groups/{id}',
    tags: ['Sub Grupo'],
    summary: 'Busca um Sub Grupo por ID',
    description: 'Retorna um Sub Grupo específico pelo seu ID.',
    request: {
        params: z.object({
            id: PSubGroupIdParam
        }),
    },
    responses: {
        200: {
            description: 'Sub Grupo encontrado',
            content: {
                'application/json': {
                    schema: SubGroupFindOneResponseSchema,
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
            description: 'Sub Grupo não encontrado',
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


export class SubGroupController {
    constructor(private readonly subGroupSvc: SubGroupService) { }

    async findAll(req: Request, res: Response) {       
        
        try {
            const {
                page = 1,
                perPage = 100,
                mainSubGroupId
            } = req.query

            const opts: {limit: number, offset: number, match?: any} = {
                limit: Number(page),
                offset: getOffset(page as number, perPage as number)
            }

            if (mainSubGroupId) {
                opts.match = {
                    main_sub_group_id: mainSubGroupId
                }
            }

            const {
                data,
                total: totalItems
            } = await this.subGroupSvc.findAll(opts);
            

            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TSubGroupFindAllResponse = {
                success: true,
                message: texts.messages.success.subGroup.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();
            
        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.subGroup.get.plural,
                cause
            };

            console.error('Error during get Sub Group, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TSubGroupFindOneResponse;
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
    
            const data = await this.subGroupSvc.findOneById(Number(id));
    
            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.subGroup.get.singular
                };

                res.status(404).json(errorResponse).end();
            }
            
            successResponse = {
                success: true,
                message: texts.messages.success.subGroup.get.singular,
                data: data as TSubGroup
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Sub Group, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }
}