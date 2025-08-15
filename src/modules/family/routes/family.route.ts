import { Router } from "express";
import { FamilyController } from "../controllers/family.controller";
import { FamilyService } from "../services/family.service";
import { FamilyRepository } from "../repository/family.repository";
import { FamilyDbProvider } from "../persistence/family.provider";
import { Db } from "mongodb";

export default function createFamilyRoutes(db: Db) {
    const familypRouter = Router();
    const familypDbProvider = new FamilyDbProvider(db)
    const familypRepo = new FamilyRepository(familypDbProvider)
    const familySvc = new FamilyService(familypRepo)
    const familypController = new FamilyController(familySvc)
    
    familypRouter.get('/', familypController.findAll.bind(familypController));
    familypRouter.get('/:id', familypController.findOneById.bind(familypController));
    
    return familypRouter;
}
