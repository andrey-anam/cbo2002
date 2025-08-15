import { Router } from "express";
import { BigGroupController } from "../controllers/big_group.controller";
import { BigGroupService } from "../services/big_group.service";
import { BigGroupRepository } from "../repository/big_group.repository";
import { BigGroupDbProvider } from "../persistence/big_group_mongo.provider";
import { Db } from "mongodb";

export default function createBigGroupRoutes(db: Db) {
    const bigGroupRouter = Router();
    const bigGroupDbProvider = new BigGroupDbProvider(db)
    const bigGroupRepo = new BigGroupRepository(bigGroupDbProvider)
    const biGroupSvc = new BigGroupService(bigGroupRepo)
    const bigGroupController = new BigGroupController(biGroupSvc)
    
    bigGroupRouter.get('/', bigGroupController.findAll.bind(bigGroupController));
    bigGroupRouter.get('/:id', bigGroupController.findOneById.bind(bigGroupController));
    
    return bigGroupRouter;
}
