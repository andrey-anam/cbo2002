import { DbProvider } from "../../../database/db_provider.intercace";
import { SynonymousDomain } from "../domain/synonymous.domain";

export class SynonymousRepository {
    constructor(private readonly synonymousDb: DbProvider<SynonymousDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.synonymousDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.synonymousDb.findOneById(id);
    }
}