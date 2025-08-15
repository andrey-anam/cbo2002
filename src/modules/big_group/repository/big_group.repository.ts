import { DbProvider } from "../../../database/db_provider.intercace";
import { BigGroupDomain } from "../domain/big_group.domain";

export class BigGroupRepository {
    constructor(private readonly bigGroupDb: DbProvider<BigGroupDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.bigGroupDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.bigGroupDb.findOneById(id);
    }
}