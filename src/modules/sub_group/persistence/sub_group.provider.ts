import { Db } from "mongodb";
import { DbProvider } from "../../../database/db_provider.intercace";
import { SubGroupDomain } from "../domain/sub_group.domain";
import { getCollection } from "../../../database/mongo_impl/mongo.instance";

export class SubGroupDbProvider implements DbProvider {
    constructor(private readonly mongoDb: Db) { }
    async find(offset: number, limit: number): Promise<{ data: SubGroupDomain[]; total: number; }> {
        try {
            const collection = await getCollection<Omit<SubGroupDomain, 'id'> & { _id: number }>(this.mongoDb, 'sub_group');
            
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

                const result = new SubGroupDomain(data);
                return result;
            });

            return {
                data,
                total
            }

        } catch (error) {
            console.error('There was an error during get Sub Groups', error);
            throw new Error('There was an error during get Sub Groups');
        }
    }

    finOne(_params?: any | undefined): Promise<SubGroupDomain | null> {
        throw new Error("Method not implemented.");
    }

    async findOneById(id: number): Promise<SubGroupDomain | null> {
        const collection = await getCollection<Omit<SubGroupDomain, 'id'> & { _id: number }>(this.mongoDb, 'sub_group');
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

        const result = new SubGroupDomain(data);

        return result;

    }

    findOneOrFail?(_params?: any | undefined): Promise<SubGroupDomain | Error> {
        throw new Error("Method not implemented.");
    }
    findOneByIdOrFail?(_params?: any | undefined): Promise<SubGroupDomain | Error> {
        throw new Error("Method not implemented.");
    }
    create?(_data: Record<string, any>): Promise<string | number | SubGroupDomain> {
        throw new Error("Method not implemented.");
    }
    save?(_saveData: Record<string, any>): Promise<string | number | SubGroupDomain> {
        throw new Error("Method not implemented.");
    }
    update?(_updateData: Record<string, any>): Promise<string | number | SubGroupDomain> {
        throw new Error("Method not implemented.");
    }
    delete?(_id: string | number): Promise<string | number | void | SubGroupDomain> {
        throw new Error("Method not implemented.");
    }

}