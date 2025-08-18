import { Router } from "express";
import { BigGroupController } from "../controllers/big_group.controller";
import { BigGroupService } from "../services/big_group.service";
import { BigGroupRepository } from "../repository/big_group.repository";
import { BigGroupMongoProvider } from "../infra/persistence/big_group_mongo.provider";
import BigGroupModel from "../infra/schemas/big_group.mongo.schema";

const bigGroupRouter = Router();
const bigGroupDbProvider = new BigGroupMongoProvider(BigGroupModel);
const bigGroupRepo = new BigGroupRepository(bigGroupDbProvider);
const biGroupSvc = new BigGroupService(bigGroupRepo);
const bigGroupController = new BigGroupController(biGroupSvc);

bigGroupRouter.get('/', bigGroupController.findAll.bind(bigGroupController));
bigGroupRouter.get('/:id', bigGroupController.findOneById.bind(bigGroupController));

export default bigGroupRouter;
