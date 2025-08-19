import { Router } from "express";
import { FamilyController } from "../controllers/family.controller";
import { FamilyService } from "../services/family.service";
import { FamilyRepository } from "../repository/family.repository";
import { FamilyMongoProvider } from "../infra/persistence/family.mongo.provider";
import FamilyModel from "../infra/schemas/family.mongo.schema";

const familyRouter = Router();
const familyDbProvider = new FamilyMongoProvider(FamilyModel);
const familyRepo = new FamilyRepository(familyDbProvider);
const biGroupSvc = new FamilyService(familyRepo);
const familyController = new FamilyController(biGroupSvc);

familyRouter.get('/', familyController.findAll.bind(familyController));
familyRouter.get('/search', familyController.searchByLabel.bind(familyController));
familyRouter.get('/:id', familyController.findOneById.bind(familyController));

export default familyRouter;
