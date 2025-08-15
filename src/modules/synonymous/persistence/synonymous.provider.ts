import { Db } from "mongodb";
import { DbProvider } from "../../../database/db_provider.intercace";
import { SynonymousDomain } from "../domain/synonymous.domain";
import { getCollection } from "../../../database/mongo_impl/mongo.instance";

export class SynonymousDbProvider implements DbProvider {
    constructor(private readonly mongoDb: Db) { }
    async find(offset: number, limit: number): Promise<{ data: SynonymousDomain[]; total: number; }> {
        try {
            const collection = await getCollection<Omit<SynonymousDomain, 'id'> & { _id: number }>(this.mongoDb, 'synonymous');
            
            const total = (await collection.find().toArray()).length
            const items = await collection.find().skip(offset).limit(limit).toArray();
            const data = items.map((item) => {
                const {
                    _id: id,
                    ...restItem
                } = item;

                const data = {
                    id,
                    ...restItem
                };

                const result = new SynonymousDomain(data);
                return result;
            });

            return {
                data,
                total
            }

        } catch (error) {
            console.error('There was an error during get Synonymous', error);
            throw new Error('There was an error during get Synonymous');
        }
    }

    finOne(_params?: any | undefined): Promise<SynonymousDomain | null> {
        throw new Error("Method not implemented.");
    }

    async findOneById(id: number): Promise<SynonymousDomain | null> {
        const collection = await getCollection<Omit<SynonymousDomain, 'id'> & { _id: number }>(this.mongoDb, 'synonymous');
        const item = await collection.findOne({
            _id: id
        })

        if (!item) {
            return null;
        }

        const {
            _id: itemId,
            ...restItem
        } = item;

        const data = {
            id: itemId,
            ...restItem
        }

        const result = new SynonymousDomain(data);

        return result;

    }

    findOneOrFail?(_params?: any | undefined): Promise<SynonymousDomain | Error> {
        throw new Error("Method not implemented.");
    }
    findOneByIdOrFail?(_params?: any | undefined): Promise<SynonymousDomain | Error> {
        throw new Error("Method not implemented.");
    }
    create?(_data: Record<string, any>): Promise<string | number | SynonymousDomain> {
        throw new Error("Method not implemented.");
    }
    save?(_saveData: Record<string, any>): Promise<string | number | SynonymousDomain> {
        throw new Error("Method not implemented.");
    }
    update?(_updateData: Record<string, any>): Promise<string | number | SynonymousDomain> {
        throw new Error("Method not implemented.");
    }
    delete?(_id: string | number): Promise<string | number | void | SynonymousDomain> {
        throw new Error("Method not implemented.");
    }

}