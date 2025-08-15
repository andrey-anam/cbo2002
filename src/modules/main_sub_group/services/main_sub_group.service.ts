import { MainSubGroupRepository } from "../repository/main_sub_group.repository";

export class MainSubGroupService {
    constructor(private readonly mainSubGroupRepo: MainSubGroupRepository) {}

    async findAll(offset: number, limit: number) {
        return await this.mainSubGroupRepo.findAll(offset, limit);
    }

    async findOneById(id: number) {
        return await this.mainSubGroupRepo.findOneById(id);
    }
}