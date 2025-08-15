import { Router } from "express";
import createBigGroupRoutes from "../modules/big_group/routes/big_group.route";
import { Db } from "mongodb";
import createFamilyRoutes from "../modules/family/routes/family.route";
import createMainSubGroupRoutes from "../modules/main_sub_group/routes/main_sub_group.route";
import createOccupationRoutes from "../modules/occupation/routes/occupation.route";
import createSubGroupRoutes from "../modules/sub_group/routes/sub_group.route";
import createSynonymousRoutes from "../modules/synonymous/routes/synonymous.route";

const mainRouter = Router();

export default function createRoutes(db: Db) {
    mainRouter.use('/big-group', createBigGroupRoutes(db))
              .use('/family', createFamilyRoutes(db))
              .use('/main-sub-group', createMainSubGroupRoutes(db))
              .use('/occupation', createOccupationRoutes(db))
              .use('/sub-group', createSubGroupRoutes(db))
              .use('/synonymous', createSynonymousRoutes(db));

    return mainRouter;
}
