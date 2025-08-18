import { OccupationRepository } from "../repository/occupation.repository";

export class OccupationService {
    constructor(private readonly occupationRepo: OccupationRepository) {}

    async findAll(opts?: any) {
        const teste = await this.occupationRepo.findAll(opts);
        return teste;
        
    }

    async findOneById(id: number) {
        return await this.occupationRepo.findOneById(id);
    }
}