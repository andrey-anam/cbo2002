import { Router } from "express";
import { SynonymousController } from "../controllers/synonymous.controller";
import { SynonymousService } from "../services/synonymous.service";
import { SynonymousRepository } from "../repository/synonymous.repository";
import { SynonymousDbProvider } from "../persistence/synonymous.provider";
import { Db } from "mongodb";

export default function createSynonymousRoutes(db: Db) {
    const synonymousRouter = Router();
    const synonymousDbProvider = new SynonymousDbProvider(db)
    const synonymousRepo = new SynonymousRepository(synonymousDbProvider)
    const synonymousvc = new SynonymousService(synonymousRepo)
    const synonymousController = new SynonymousController(synonymousvc)
    
    synonymousRouter.get('/', synonymousController.findAll.bind(synonymousController));
    synonymousRouter.get('/:id', synonymousController.findOneById.bind(synonymousController));
    
    return synonymousRouter;
}
