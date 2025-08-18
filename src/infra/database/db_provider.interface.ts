export interface DbProvider<T = any> {
    find(opts?: any | undefined): Promise<{data: T[], total: number}>;
    findOne(opts?: any | undefined): Promise<T | null>;
    findOneById(id: string | number): Promise<T | null>;
    findOneOrFail?(opts?: any | undefined): Promise<T | Error>;
    findOneByIdOrFail?(opts?: any | undefined): Promise<T | Error>;
    create?(data: Record<string, any>): Promise<string | number | T>;
    save?(saveData: Record<string, any>): Promise<string | number | T>;
    update?(updateData: Record<string, any>): Promise<string | number | T>;
    delete?(id: string | number): Promise<void | string | number | T>
}