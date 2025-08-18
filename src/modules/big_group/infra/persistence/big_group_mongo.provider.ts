import { Model, RootFilterQuery } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TBigGroup } from "../../domain/big_group.domain";
import { IBigGroupMongo } from "../schemas/big_group.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<IBigGroupMongo>;
    [x: string]: any;
}

export class BigGroupMongoProvider implements DbProvider<TBigGroup> {
    constructor(private bigGroupModel: Model<IBigGroupMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TBigGroup[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.bigGroupModel.find(match)).length;
            const result = await this.bigGroupModel.find(match).skip(offset).limit(limit).lean();

            const data: TBigGroup[] = result.map((entity) => {
                const {
                    _id: id,
                    ...restEntity
                } = entity;
                return {
                    id,
                    ...restEntity
                }
            })

            return {
                data,
                total
            }

        } catch (error) {
            console.error(`There was an error during get Big Groups, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TBigGroup | null> {

        try {
            const  { match } = opts;
            const entity = await this.bigGroupModel.findOne(match).lean();

            if (!entity) {
                return null
            }

            const {
                _id: id,
                ...restEntity
            } = entity;
            
            const data: TBigGroup = {
                id,
                ...restEntity
            };

            return data;

        } catch (error) {
            console.error(`There was an error during get Big Group, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: number): Promise<TBigGroup | null> {
        try {
            const [entity] = await this.bigGroupModel.find({_id: id}).lean();

            if (!entity) {
                return null;
            }

            const {
                _id,
                ...restEntity
            } = entity;

            const data: TBigGroup = {
                id: _id,
                ...restEntity
            };

            return data;
        } catch (error) {
            console.error(`There was an error during get Big Group, at mongo:`, error);
            throw error;
        }
    }

}