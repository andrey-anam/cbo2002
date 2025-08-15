import { SubGroupRepository } from "../repository/sub_group.repository";

export class SubGroupService {
    constructor(private readonly subGroupRepo: SubGroupRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.subGroupRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.subGroupRepo.findOneById(id);
    }
}