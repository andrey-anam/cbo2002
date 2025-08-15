import { SynonymousRepository } from "../repository/synonymous.repository";

export class SynonymousService {
    constructor(private readonly synonymousRepo: SynonymousRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.synonymousRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.synonymousRepo.findOneById(id);
    }
}