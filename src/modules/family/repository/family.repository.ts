import { DbProvider } from "../../../database/db_provider.intercace";
import { FamilyDomain } from "../domain/family.domain";

export class FamilyRepository {
    constructor(private readonly familyDb: DbProvider<FamilyDomain>) {}

    async findAll(offset: number, limit: number) {
        return await this.familyDb.find(offset, limit);
    }

    async findOneById(id: number) {
        return await this.familyDb.findOneById(id);
    }
}