import { OccupationRepository } from "../repository/occupation.repository";

export class OccupationService {
    constructor(private readonly occupationRepo: OccupationRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.occupationRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.occupationRepo.findOneById(id);
    }
}