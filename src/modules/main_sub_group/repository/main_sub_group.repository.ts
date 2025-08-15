import { DbProvider } from "../../../database/db_provider.intercace";
import { MainSubGroupDomain } from "../domain/main_sub_group.domain";

export class MainSubGroupRepository {
    constructor(private readonly mainSubGroupDb: DbProvider<MainSubGroupDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.mainSubGroupDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.mainSubGroupDb.findOneById(id);
    }
}