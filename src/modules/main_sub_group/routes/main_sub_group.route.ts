import { Router } from "express";
import { MainSubGroupController } from "../controllers/main_sub_group.controller";
import { MainSubGroupService } from "../services/main_sub_group.service";
import { MainSubGroupRepository } from "../repository/main_sub_group.repository";
import { MainSubGroupDbProvider } from "../persistence/main_sub_group.provider";
import { Db } from "mongodb";

export default function createMainSubGroupRoutes(db: Db) {
    const mainSubGroupRouter = Router();
    const mainSubGroupDbProvider = new MainSubGroupDbProvider(db)
    const mainSubGroupRepo = new MainSubGroupRepository(mainSubGroupDbProvider)
    const mainSubGroupvc = new MainSubGroupService(mainSubGroupRepo)
    const mainSubGroupController = new MainSubGroupController(mainSubGroupvc)
    
    mainSubGroupRouter.get('/', mainSubGroupController.findAll.bind(mainSubGroupController));
    mainSubGroupRouter.get('/:id', mainSubGroupController.findOneById.bind(mainSubGroupController));
    
    return mainSubGroupRouter;
}
