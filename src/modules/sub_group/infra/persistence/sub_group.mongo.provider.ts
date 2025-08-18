import { Model, RootFilterQuery } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TSubGroup } from "../../domain/sub_group.domain";
import { ISubGroupMongo } from "../schemas/sub_group.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<ISubGroupMongo>;
    [x: string]: any;
}

export class SubGroupMongoProvider implements DbProvider<TSubGroup> {
    constructor(private subGroupModel: Model<ISubGroupMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TSubGroup[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.subGroupModel.find(match)).length;
            const result = await this.subGroupModel.find(match).skip(offset).limit(limit).lean();

            const data: TSubGroup[] = result.map((entity) => {
                const {
                    _id: id,
                    ...restEntity
                } = entity;

                return {
                    id,
                    ...restEntity
                };
            })

            return {
                data,
                total
            }

        } catch (error) {
            console.error(`There was an error during get Sub Group, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TSubGroup | null> {

        try {
            const  { match } = opts;
            const entity = await this.subGroupModel.findOne(match).lean();

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
            console.error(`There was an error during get Sub Group, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: number): Promise<TSubGroup | null> {
        try {
            const entity = await this.subGroupModel.findById(id).lean();

            if (!entity) {
                return null;
            }

            const {
                _id,
                ...restEntity
            } = entity;

            return {
                id: _id,
                ...restEntity
            };
        } catch (error) {
            console.error(`There was an error during get Sub Group, at mongo:`, error);
            throw error;
        }
    }

}