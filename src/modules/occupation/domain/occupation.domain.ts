import { TBaseEntity } from "../../base.entity";

type TOccuppationData = TBaseEntity & {
    familyId: number;
}

export class OccupationDomain {
    id!: number;
    label!: string;
    familyId!: number;

    constructor(data: TOccuppationData) {
        Object.assign(this, data)
    }
}