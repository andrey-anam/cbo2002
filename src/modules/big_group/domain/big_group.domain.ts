import { TBaseEntity } from "../../base.entity";

export class BigGroupDomain {
    id!: number;
    label!: string;

    constructor(data: TBaseEntity) {
        Object.assign(this, data)
    }
}