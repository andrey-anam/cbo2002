import { Model, RootFilterQuery } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TMainSubGroup } from "../../domain/main_sub_group.domain";
import { IMainSubGroupMongo } from "../schemas/main_sub_group.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<IMainSubGroupMongo>;
    [x: string]: any;
}

export class MainSubGroupMongoProvider implements DbProvider<TMainSubGroup> {
    constructor(private mainSubGroupModel: Model<IMainSubGroupMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TMainSubGroup[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.mainSubGroupModel.find(match)).length;
            const result = await this.mainSubGroupModel.find(match).skip(offset).limit(limit).lean();

            const data: TMainSubGroup[] =  result.map((entity) => {
                const {
                    _id: id,
                    ...restEntity
                } = entity;

                return {
                    id,
                    ...restEntity
                };
            });

            return {
                data,
                total
            }

        } catch (error) {
            console.error(`There was an error during get Main Sub Group, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TMainSubGroup | null> {

        try {
            const  { match } = opts;
            const entity = await this.mainSubGroupModel.findOne(match).lean();

            if (!entity) {
                return null
            }

            const {
                _id: id,
                ...restEntity
            } = entity;
                        
            return {
                id,
                ...restEntity
            };

        } catch (error) {
            console.error(`There was an error during get Main Sub Group, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: number): Promise<TMainSubGroup | null> {
        try {
            const entity = await this.mainSubGroupModel.findById(id).lean();

            if (!entity) {
                return null;
            }

            const {
                _id,
                ...restEntity
            } = entity;

            return {
                id,
                ...restEntity
            };
        } catch (error) {
            console.error(`There was an error during get Main Sub Group, at mongo:`, error);
            throw error;
        }
    }

}