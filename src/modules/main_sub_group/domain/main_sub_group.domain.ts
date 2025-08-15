import { TBaseEntity } from "../../base.entity";

type TMainSubGroupDomainData = TBaseEntity & {
    bigGroupId: number;
}

export class MainSubGroupDomain {
    id!: number;
    label!: string;
    bigGroupId!: number;

    constructor(data: TMainSubGroupDomainData) {
        Object.assign(this, data)
    }
}