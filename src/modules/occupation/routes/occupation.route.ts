import { Router } from "express";
import { OccupationController } from "../controllers/occupation.controller";
import { OccupationService } from "../services/occupation.service";
import { OccupationRepository } from "../repository/occupation.repository";
import { OccupationDbProvider } from "../persistence/occupation.provider";
import { Db } from "mongodb";

export default function createOccupationRoutes(db: Db) {
    const occupationRouter = Router();
    const occupationDbProvider = new OccupationDbProvider(db)
    const occupationRepo = new OccupationRepository(occupationDbProvider)
    const occupationvc = new OccupationService(occupationRepo)
    const occupationController = new OccupationController(occupationvc)
    
    occupationRouter.get('/', occupationController.findAll.bind(occupationController));
    occupationRouter.get('/:id', occupationController.findOneById.bind(occupationController));
    
    return occupationRouter;
}
