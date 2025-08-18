import { BigGroupRepository } from "../repository/big_group.repository";

export class BigGroupService {
    constructor(private readonly bigGroupRepo: BigGroupRepository) {}

    async findAll(opts?: any) {
        return await this.bigGroupRepo.findAll(opts);
    }

    async findOneById(id: number) {
        return await this.bigGroupRepo.findOneById(id);
    }
}