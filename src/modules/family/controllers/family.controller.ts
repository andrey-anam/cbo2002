import { FamilyService } from "../services/family.service";
import { NextFunction, Request, Response } from "express";

export class FamilyController {
    constructor(private readonly familySvc: FamilyService) { }

    async findAll(req: Request, res: Response, _next: NextFunction) {        
        const {
            page = 1,
            perPage = 100
        } = req.query
        const offset = (Number(page) - 1) * Number(perPage);
        const {
            data,
            total: totalItems
        } = await this.familySvc.findAll(offset, Number(perPage));


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

        const result = await this.familySvc.findOneById(Number(id));

        if (!result) {
            res.status(404).json({'message': 'Família não encontrada!'}).end();
        }

        res.status(200).json(result).end();
    }
}