import { Router } from "express";
import { MainSubGroupController } from "../controllers/main_sub_group.controller";
import { MainSubGroupService } from "../services/main_sub_group.service";
import { MainSubGroupRepository } from "../repository/main_sub_group.repository";
import { MainSubGroupMongoProvider } from "../infra/persistence/main_sub_group.mongo.provider";
import MainSubGroupModel from "../infra/schemas/main_sub_group.mongo.schema";

const mainSubGroupRouter = Router();
const mainSubGroupDbProvider = new MainSubGroupMongoProvider(MainSubGroupModel);
const mainSubGroupRepo = new MainSubGroupRepository(mainSubGroupDbProvider);
const mainSubGroupvc = new MainSubGroupService(mainSubGroupRepo);
const mainSubGroupController = new MainSubGroupController(mainSubGroupvc);

mainSubGroupRouter.get('/', mainSubGroupController.findAll.bind(mainSubGroupController));
mainSubGroupRouter.get('/:id', mainSubGroupController.findOneById.bind(mainSubGroupController));

export default mainSubGroupRouter;