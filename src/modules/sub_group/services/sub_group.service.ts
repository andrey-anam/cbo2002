import { SubGroupRepository } from "../repository/sub_group.repository";

export class SubGroupService {
    constructor(private readonly subGroupRepo: SubGroupRepository) {}

    async findAll(opts?: any) {
        return await this.subGroupRepo.findAll(opts);
    }

    async findOneById(id: number) {
        return await this.subGroupRepo.findOneById(id);
    }
}