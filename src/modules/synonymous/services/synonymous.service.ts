import { SynonymousRepository } from "../repository/synonymous.repository";

export class SynonymousService {
    constructor(private readonly synonymousRepo: SynonymousRepository) {}

    async findAll(opts?: any) {
        return await this.synonymousRepo.findAll(opts);
    }

    async findOneById(id: string) {
        return await this.synonymousRepo.findOneById(id);
    }
}