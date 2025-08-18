import { Router } from "express";
import bigGroupRouter from "../modules/big_group/routes/big_group.route";
import familyRouter from "../modules/family/routes/family.route";
import mainSubGroupRouter from "../modules/main_sub_group/routes/main_sub_group.route";
import occupationRouter from "../modules/occupation/routes/occupation.route";
import subGroupRouter from "../modules/sub_group/routes/sub_group.route";
import synonymousRouter from "../modules/synonymous/routes/synonymous.route";

const mainRouter = Router();

mainRouter
    .use('/big-groups', bigGroupRouter)
    .use('/families', familyRouter)
    .use('/main-sub-groups', mainSubGroupRouter)
    .use('/occupations', occupationRouter)
    .use('/sub-groups', subGroupRouter)
    .use('/synonymous', synonymousRouter);


export default mainRouter;