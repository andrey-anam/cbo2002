import { Model, RootFilterQuery } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TFamily } from "../../domain/family.domain";
import { IFamilyMongo } from "../schemas/family.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<IFamilyMongo>;
    [x: string]: any;
}

export class FamilyMongoProvider implements DbProvider<TFamily> {
    constructor(private familyModel: Model<IFamilyMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TFamily[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.familyModel.find(match)).length;
            const result = await this.familyModel.find(match).skip(offset).limit(limit).lean();

            const data: TFamily[] = result.map((entity) => {
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
            console.error(`There was an error during get Family, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TFamily | null> {

        try {
            const  { match } = opts;
            const entity = await this.familyModel.findOne(match).lean();

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
            }

        } catch (error) {
            console.error(`There was an error during get Family, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: number): Promise<TFamily | null> {
        try {
            const entity = await this.familyModel.findById(id).lean();

            if (!entity) {
                return null;
            }

            const {
                _id,
                ...restEntity
            } = entity;

            return {
                id: _id,
                ...restEntity,
            };
        } catch (error) {
            console.error(`There was an error during get Family, at mongo:`, error);
            throw error;
        }
    }

}