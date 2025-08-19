import { Router } from "express";
import { SubGroupController } from "../controllers/sub_group.controller";
import { SubGroupService } from "../services/sub_group.service";
import { SubGroupRepository } from "../repository/sub_group.repository";
import { SubGroupMongoProvider } from "../infra/persistence/sub_group.mongo.provider";
import SubGroupModel from "../infra/schemas/sub_group.mongo.schema";

const subGroupRouter = Router();
const subGroupDbProvider = new SubGroupMongoProvider(SubGroupModel);
const subGroupRepo = new SubGroupRepository(subGroupDbProvider);
const subGroupvc = new SubGroupService(subGroupRepo);
const subGroupController = new SubGroupController(subGroupvc);

subGroupRouter.get('/', subGroupController.findAll.bind(subGroupController));
subGroupRouter.get('/search', subGroupController.searchByLabel.bind(subGroupController));
subGroupRouter.get('/:id', subGroupController.findOneById.bind(subGroupController));

export default subGroupRouter;
