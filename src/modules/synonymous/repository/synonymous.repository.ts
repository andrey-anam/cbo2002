import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TSynonymous } from "../domain/synonymous.domain";

export class SynonymousRepository {
    constructor(private readonly synonymousDb: DbProvider<TSynonymous>) {}

    async findAll(opts?: any) {
        return await this.synonymousDb.find(opts);
    }

    async findOneById(id: string) {
        return await this.synonymousDb.findOneById(id);
    }
}