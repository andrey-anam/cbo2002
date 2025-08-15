import { DbProvider } from "../../../database/db_provider.intercace";
import { SubGroupDomain } from "../domain/sub_group.domain";

export class SubGroupRepository {
    constructor(private readonly subGroupDb: DbProvider<SubGroupDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.subGroupDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.subGroupDb.findOneById(id);
    }
}