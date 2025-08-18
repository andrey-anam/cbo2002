

// Define as operações OpenAPI para Family
import {openApiRegistry, PFamilyIdParam, QPageParams, QPerPageParams, QSubGroupIdParam} from "../../../infra/docs/openapi_config";
import { z } from "zod";
import {
    ErrorResponseSchema,
    FamilyFindAllResponseSchema,
    FamilyFindOneResponseSchema, TErrorResponse, TFamilyFindAllResponse, TFamilyFindOneResponse, TPagination
} from "../../../infra/docs/schemas";
import {FamilyService} from "../services/family.service";
import { Request, Response } from "express"
import {getOffset, getTotalPages, texts} from "../../../infra/utils";
import {TFamily} from "../domain/family.domain";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);


openApiRegistry.registerPath({
    method: 'get',
    path: '/families',
    tags: ['Família'],
    summary: 'Lista todas as Famílias',
    description: 'Retorna uma lista paginada de todas as Famílias.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            subGroupId: QSubGroupIdParam
        })
    },
    responses: {
        200: {
            description: 'Lista de Famílias',
            content: {
                'application/json': {
                    schema: FamilyFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhuma Família encontrada',
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
    path: '/families/{id}',
    tags: ['Família'],
    summary: 'Busca uma Família por ID',
    description: 'Retorna uma Família específica pelo seu ID.',
    request: {
        params: z.object({
            id: PFamilyIdParam
        }),
    },
    responses: {
        200: {
            description: 'Família encontrada',
            content: {
                'application/json': {
                    schema: FamilyFindOneResponseSchema,
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
            description: 'Família não encontrada',
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


export class FamilyController {
    constructor(private readonly familySvc: FamilyService) { }

    async findAll(req: Request, res: Response) {       
        
        try {
            const {
                page = 1,
                perPage = 100,
                subGroupId
            } = req.query

            const opts: {limit: number, offset: number, match?: any} = {
                limit: Number(perPage),
                offset: getOffset(page as number, perPage as number)
            }

            if (subGroupId) {
                opts.match = {
                    sub_group_id: subGroupId
                }
            }

            const {
                data,
                total: totalItems
            } = await this.familySvc.findAll(opts);
            

            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TFamilyFindAllResponse = {
                success: true,
                message: texts.messages.success.family.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();
            
        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.family.get.plural,
                cause
            };

            console.error('Error during get Family, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TFamilyFindOneResponse;
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
    
            const data = await this.familySvc.findOneById(Number(id));
    
            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.family.get.singular
                };

                res.status(404).json(errorResponse).end();
            }
            
            successResponse = {
                success: true,
                message: texts.messages.success.family.get.singular,
                data: data as TFamily
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Family, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }
}