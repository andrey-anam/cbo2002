import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TSubGroup } from "../domain/sub_group.domain";

export class SubGroupRepository {
    constructor(private readonly subGroupDb: DbProvider<TSubGroup>) {}

    async findAll(opts?: any) {
        return await this.subGroupDb.find(opts);
    }

    async findOneById(id: number) {
        return await this.subGroupDb.findOneById(id);
    }
}