import { Db } from "mongodb";
import { DbProvider } from "../../../database/db_provider.intercace";
import { FamilyDomain } from "../domain/family.domain";
import { getCollection } from "../../../database/mongo_impl/mongo.instance";

export class FamilyDbProvider implements DbProvider {
    constructor(private readonly mongoDb: Db) { }
    async find(offset: number, limit: number): Promise<{ data: FamilyDomain[]; total: number; }> {
        try {
            const collection = await getCollection<Omit<FamilyDomain, 'id'> & { _id: number }>(this.mongoDb, 'family');
            
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

                const result = new FamilyDomain(data);
                return result;
            });

            return {
                data,
                total
            }

        } catch (error) {
            console.error('There was an error during get Family', error);
            throw new Error('There was an error during get Family');
        }
    }

    finOne(_params?: any | undefined): Promise<FamilyDomain | null> {
        throw new Error("Method not implemented.");
    }

    async findOneById(id: number): Promise<FamilyDomain | null> {
        const collection = await getCollection<Omit<FamilyDomain, 'id'> & { _id: number }>(this.mongoDb, 'family');
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

        const result = new FamilyDomain(data);

        return result;

    }

    findOneOrFail?(_params?: any | undefined): Promise<FamilyDomain | Error> {
        throw new Error("Method not implemented.");
    }
    findOneByIdOrFail?(_params?: any | undefined): Promise<FamilyDomain | Error> {
        throw new Error("Method not implemented.");
    }
    create?(_data: Record<string, any>): Promise<string | number | FamilyDomain> {
        throw new Error("Method not implemented.");
    }
    save?(_saveData: Record<string, any>): Promise<string | number | FamilyDomain> {
        throw new Error("Method not implemented.");
    }
    update?(_updateData: Record<string, any>): Promise<string | number | FamilyDomain> {
        throw new Error("Method not implemented.");
    }
    delete?(_id: string | number): Promise<string | number | void | FamilyDomain> {
        throw new Error("Method not implemented.");
    }

}