import { TBaseEntity } from "../../base.entity";

type TSubGroupData = TBaseEntity & {
    mainSubGroupId: number;
}

export class SubGroupDomain {
    id!: number;
    label!: string;
    mainSubGroupId!: number;

    constructor(data: TSubGroupData) {
        Object.assign(this, data)
    }
}