import { DbProvider } from "../../../infra/database/db_provider.interface";
import { TOccupation } from "../domain/occupation.domain";

export class OccupationRepository {
    constructor(private readonly occupationDb: DbProvider<TOccupation>) {}

    async findAll(opts?: any) {
        return await this.occupationDb.find(opts);
    }

    async findOneById(id: number) {
        return await this.occupationDb.findOneById(id);
    }
}