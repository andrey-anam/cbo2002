import { TBaseEntity } from "../../base.entity";

type TFamilyDomainData = TBaseEntity & {
    subGroupId: number;
}

export class FamilyDomain {
    id!: number;
    label!: string;
    subGroupId!: number;

    constructor(data: TFamilyDomainData) {
        Object.assign(this, data)
    }
}