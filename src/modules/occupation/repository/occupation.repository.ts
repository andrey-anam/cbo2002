import { DbProvider } from "../../../database/db_provider.intercace";
import { OccupationDomain } from "../domain/occupation.domain";

export class OccupationRepository {
    constructor(private readonly occupationDb: DbProvider<OccupationDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.occupationDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.occupationDb.findOneById(id);
    }
}