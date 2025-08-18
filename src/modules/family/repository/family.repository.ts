import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TFamily } from "../domain/family.domain";

export class FamilyRepository {
    constructor(private readonly familyDb: DbProvider<TFamily>) {}

    async findAll(opts?: any) {
        const teste =  await this.familyDb.find(opts);
        return teste;        
    }

    async findOneById(id: number) {
        return await this.familyDb.findOneById(id);
    }
}