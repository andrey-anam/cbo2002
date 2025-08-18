import { Router } from "express";
import { SynonymousController } from "../controllers/synonymous.controller";
import { SynonymousService } from "../services/synonymous.service";
import { SynonymousRepository } from "../repository/synonymous.repository";
import { SynonymousMongoProvider } from "../infra/persistence/synonymous.mongo.provider";
import SynonymousModel from "../infra/schemas/synonymous.mongo.schema";

const synonymousRouter = Router();
const synonymousDbProvider = new SynonymousMongoProvider(SynonymousModel);
const synonymousRepo = new SynonymousRepository(synonymousDbProvider);
const synonymousvc = new SynonymousService(synonymousRepo);
const synonymousController = new SynonymousController(synonymousvc);

synonymousRouter.get('/', synonymousController.findAll.bind(synonymousController));
synonymousRouter.get('/:id', synonymousController.findOneById.bind(synonymousController));

export default synonymousRouter;
