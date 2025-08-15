import { OccupationService } from "../services/occupation.service";
import { NextFunction, Request, Response } from "express";

export class OccupationController {
    constructor(private readonly occupationSvc: OccupationService) { }

    async findAll(req: Request, res: Response, _next: NextFunction) {        
        const {
            page = 1,
            perPage = 100
        } = req.query
        const offset = (Number(page) - 1) * Number(perPage);
        const {
            data,
            total: totalItems
        } = await this.occupationSvc.findAll(offset, Number(perPage));


        const totalPages = Math.ceil(totalItems / Number(perPage));

        const pagination = {
            page: Number(page),
            perPage: Number(perPage),
            totalItems: Number(totalItems),
            totalPages: Number(totalPages),
            nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
            previousPage: Number(page) == 1 ? null : Number(page) - 1
        }

        const result = {
            data,
            pagination
        }

        res.status(totalItems > 0 ? 200 : 204).json(result).end();
    }

    async findOneById(req: Request, res: Response, _next: NextFunction) {
        const {
            id
        } = req.params

        if (!id) {
            res.status(400).json({'message': 'Passar ID!'}).end();
            throw new Error('Passar ID!');
        }

        const result = await this.occupationSvc.findOneById(Number(id));

        if (!result) {
            res.status(404).json({'message': 'Ocupação não encontrado!'}).end();
        }

        res.status(200).json(result).end();
    }
}