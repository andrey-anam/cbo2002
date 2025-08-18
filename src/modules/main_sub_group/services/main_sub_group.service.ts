import { MainSubGroupRepository } from "../repository/main_sub_group.repository";

export class MainSubGroupService {
    constructor(private readonly mainSubGroupRepo: MainSubGroupRepository) {}

    async findAll(opts?: any) {
        const teste = await this.mainSubGroupRepo.findAll(opts);
        return teste;
        
    }

    async findOneById(id: number) {
        return await this.mainSubGroupRepo.findOneById(id);
    }
}