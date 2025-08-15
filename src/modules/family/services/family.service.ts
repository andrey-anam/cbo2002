import { FamilyRepository } from "../repository/family.repository";

export class FamilyService {
    constructor(private readonly familyRepo: FamilyRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.familyRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.familyRepo.findOneById(id);
    }
}