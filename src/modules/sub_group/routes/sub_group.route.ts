import { Router } from "express";
import { SubGroupController } from "../controllers/sub_group.controller";
import { SubGroupService } from "../services/sub_group.service";
import { SubGroupRepository } from "../repository/sub_group.repository";
import { SubGroupDbProvider } from "../persistence/sub_group.provider";
import { Db } from "mongodb";

export default function createSubGroupRoutes(db: Db) {
    const subGroupRouter = Router();
    const subGroupDbProvider = new SubGroupDbProvider(db)
    const subGroupRepo = new SubGroupRepository(subGroupDbProvider)
    const subGroupvc = new SubGroupService(subGroupRepo)
    const subGroupController = new SubGroupController(subGroupvc)
    
    subGroupRouter.get('/', subGroupController.findAll.bind(subGroupController));
    subGroupRouter.get('/:id', subGroupController.findOneById.bind(subGroupController));
    
    return subGroupRouter;
}
