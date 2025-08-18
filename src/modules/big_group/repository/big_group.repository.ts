import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TBigGroup } from "../domain/big_group.domain";

export class BigGroupRepository {
    constructor(private readonly bigGroupDb: DbProvider<TBigGroup>) {}

    async findAll(opts?: any) {
        return  await this.bigGroupDb.find(opts);
    }

    async findOneById(id: number) {
        return await this.bigGroupDb.findOneById(id);
    }
}