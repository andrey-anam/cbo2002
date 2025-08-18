import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TMainSubGroup } from "../domain/main_sub_group.domain";

export class MainSubGroupRepository {
    constructor(private readonly mainSubGroupDb: DbProvider<TMainSubGroup>) {}

    async findAll(opts?: any) {
        return await this.mainSubGroupDb.find(opts);
    }

    async findOneById(id: number) {
        return await this.mainSubGroupDb.findOneById(id);
    }
}