import { Model, RootFilterQuery, Types } from "mongoose";
import { DbProvider } from "../../../../infra/database/db_provider.interface";
import { TSynonymous } from "../../domain/synonymous.domain";
import { ISynonymousMongo } from "../schemas/synonymous.mongo.schema";

type TOpts = {
    limit: number;
    offset: number;
    match: RootFilterQuery<ISynonymousMongo>;
    [x: string]: any;
}

export class SynonymousMongoProvider implements DbProvider<TSynonymous> {
    constructor(private synonymousModel: Model<ISynonymousMongo>) { }
    async find(
        opts: TOpts = { limit: 100, offset: 0, match: {} }
    ): Promise<{ data: TSynonymous[]; total: number; }> {

        try {

            const {
                limit,
                offset,
                match
            } = opts

            const total = (await this.synonymousModel.find(match)).length;
            const result = await this.synonymousModel.find(match).skip(offset).limit(limit).lean();

            const data: TSynonymous[] = result.map((entity) => {
                const {
                    _id,
                    ...restEntity
                } = entity;

                return restEntity;
            })

            return {
                data,
                total
            }

        } catch (error) {
            console.error(`There was an error during get Synonymous, at mongo:`, error);
            throw error;
        }
    }

    async findOne(opts: Pick<TOpts, 'match'>): Promise<TSynonymous | null> {

        try {
            const  { match } = opts;
            const entity = await this.synonymousModel.findOne(match).lean();

            if (!entity) {
                return null
            }

            const {
                _id,
                ...restEntity
            } = entity;
            
            return restEntity;

        } catch (error) {
            console.error(`There was an error during get Synonymous, at mongo:`, error);
            throw error;
        }

    }

    async findOneById(id: string): Promise<TSynonymous | null> {
        try {            
            const entity = await this.synonymousModel.findById(new Types.ObjectId(id)).lean();

            if (!entity) {
                return null;
            }

            const {
                _id,
                ...restEntity
            } = entity;

            return restEntity;
        } catch (error) {
            console.error(`There was an error during get Synonymous, at mongo:`, error);
            throw error;
        }
    }

}