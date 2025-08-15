type SynonymousData = {
    occupationId: number;
    label: string;
}

export class SynonymousDomain {
    occupationId!: number;
    label!: string;

    constructor(data: SynonymousData) {
        Object.assign(this, data)
    }
}