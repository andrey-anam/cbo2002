import { FamilyRepository } from "../repository/family.repository";

export class FamilyService {
    constructor(private readonly familyRepo: FamilyRepository) {}

    async findAll(opts?: any) {
        const teste = await this.familyRepo.findAll(opts);
        return teste;
        
    }

    async findOneById(id: number) {
        return await this.familyRepo.findOneById(id);
    }
}