import { BigGroupRepository } from "../repository/big_group.repository";

export class BigGroupService {
    constructor(private readonly bigGroupRepo: BigGroupRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.bigGroupRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.bigGroupRepo.findOneById(id);
    }
}