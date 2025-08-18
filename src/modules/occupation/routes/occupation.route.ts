import { Router } from "express";
import { OccupationController } from "../controllers/occupation.controller";
import { OccupationService } from "../services/occupation.service";
import { OccupationRepository } from "../repository/occupation.repository";
import { OccupationMongoProvider } from "../infra/persistence/occupation.mongo.provider";
import OccupationModel from "../infra/schemas/occupation.mongo.schema";

const occupationRouter = Router();
const occupationDbProvider = new OccupationMongoProvider(OccupationModel);
const occupationRepo = new OccupationRepository(occupationDbProvider);
const occupationvc = new OccupationService(occupationRepo);
const occupationController = new OccupationController(occupationvc);

occupationRouter.get('/', occupationController.findAll.bind(occupationController));
occupationRouter.get('/:id', occupationController.findOneById.bind(occupationController));

export default occupationRouter;
