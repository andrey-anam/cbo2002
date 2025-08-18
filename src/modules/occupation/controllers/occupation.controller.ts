import { OccupationService } from "../services/occupation.service";
import { Request, Response } from "express";
import { getTotalPages, getOffset, texts } from "../../../infra/utils";
import {
    OccupationFindAllResponseSchema,
    OccupationFindOneResponseSchema,
    ErrorResponseSchema, TPagination, TOccupationFindAllResponse, TErrorResponse, TOccupationFindOneResponse
} from "../../../infra/docs/schemas";
import {openApiRegistry, POccupationIdParam, QFamilyIdParam, QPageParams, QPerPageParams} from "../../../infra/docs/openapi_config";
import { z } from "zod";
import {TOccupation} from "../domain/occupation.domain";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

// Define as operações OpenAPI para Occupation
openApiRegistry.registerPath({
    method: 'get',
    path: '/occupations',
    tags: ['Ocupação'],
    summary: 'Lista todas as Ocupações',
    description: 'Retorna uma lista paginada de todas as Ocupações.',
    request: {
        query: z.object({
            page: QPageParams,
            perPage: QPerPageParams,
            familyId: QFamilyIdParam
        })
    },
    responses: {
        200: {
            description: 'Lista de Ocupações',
            content: {
                'application/json': {
                    schema: OccupationFindAllResponseSchema,
                },
            },
        },
        204: {
            description: 'Nenhuma Ocupação encontrada',
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
    path: '/occupations/{id}',
    tags: ['Ocupação'],
    summary: 'Busca uma Ocupação por ID',
    description: 'Retorna uma Ocupação específica pelo seu ID.',
    request: {
        params: z.object({
            id: POccupationIdParam
        }),
    },
    responses: {
        200: {
            description: 'Ocupação encontrada',
            content: {
                'application/json': {
                    schema: OccupationFindOneResponseSchema,
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
            description: 'Ocupação não encontrada',
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


export class OccupationController {
    constructor(private readonly occupationSvc: OccupationService) { }

    async findAll(req: Request, res: Response) {       
        
        try {
            const {
                page = 1,
                perPage = 100,
                familyId
            } = req.query

            const opts: {limit: number, offset: number, match?: any} = {
                limit: Number(perPage),
                offset: getOffset(page as number, perPage as number)
            }

            if (familyId) {
                opts.match = {
                    family_id: familyId
                }
            }

            const {
                data,
                total: totalItems
            } = await this.occupationSvc.findAll(opts);
            

            const totalPages = getTotalPages(totalItems, Number(perPage));

            const pagination: TPagination = {
                items: data.length,
                totalItems,
                page: Number(page),
                perPage: Number(perPage),
                totalPages,
                hasNext: Number(page) < totalPages
            }

            const result: TOccupationFindAllResponse = {
                success: true,
                message: texts.messages.success.occupation.get.plural,
                data,
                pagination
            }

            res.status(data.length > 0 ? 200 : 204).json(result).end();
            
        } catch (cause) {
            const errorResponse: TErrorResponse = {
                code: 'CÓDIGO_GENÉRICO',
                success: false,
                message: texts.messages.error.occupation.get.plural,
                cause
            };

            console.error('Error during get Occupation, controller:', JSON.stringify(errorResponse, null, 2))

            res.status(500).json(errorResponse).end();
        }

    }

    async findOneById(req: Request, res: Response) {
        let successResponse: TOccupationFindOneResponse;
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
    
            const data = await this.occupationSvc.findOneById(Number(id));
    
            if (!data) {
                errorResponse = {
                    success: false,
                    code: 'NOT_FOUND',
                    message: texts.messages.error.occupation.get.singular
                };

                res.status(404).json(errorResponse).end();
            }
            
            successResponse = {
                success: true,
                message: texts.messages.success.occupation.get.singular,
                data: data as TOccupation
            };

            res.status(200).json(successResponse).end();
        } catch (cause) {
            let errorResponse: TErrorResponse = {
                success: false,
                code: 'INTERNAL_SERVER_ERROR',
                message: texts.messages.error.internalServerError,
                cause
            };

            console.error('There was an error during get Occupation, controller', JSON.stringify(errorResponse, null, 2));
            res.status(500).json(errorResponse).end();
        }
    }
}