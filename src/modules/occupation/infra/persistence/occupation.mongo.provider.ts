import { Model, RootFilterQuery } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TOccupation } from "../../domain/occupation.domain";
import { IOccupationMongo } from "../schemas/occupation.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<IOccupationMongo>;
    [x: string]: any;
}

export class OccupationMongoProvider implements DbProvider<TOccupation> {
    constructor(private occupationModel: Model<IOccupationMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TOccupation[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.occupationModel.find(match)).length;
            const result = await this.occupationModel.find(match).skip(offset).limit(limit).lean();

            const data: TOccupation[] = result.map((entity) => {
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
            console.error(`There was an error during get Occupation, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TOccupation | null> {

        try {
            const { match } = opts;
            const entity = await this.occupationModel.findOne(match).lean();

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
            console.error(`There was an error during get Occupation, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: number): Promise<TOccupation | null> {
        try {
            const entity = await this.occupationModel.findById(id).lean();

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
            console.error(`There was an error during get Occupation, at mongo:`, error);
            throw error;
        }
    }

}