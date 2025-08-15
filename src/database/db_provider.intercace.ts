export interface DbProvider<T = any> {
    find(offset: number, limit: number, opts?: any | undefined): Promise<{data: T[], total: number}>;
    finOne(params?: any | undefined): Promise<T | null>;
    findOneById(id: string | number): Promise<T | null>;
    findOneOrFail?(params?: any | undefined): Promise<T | Error>;
    findOneByIdOrFail?(params?: any | undefined): Promise<T | Error>;
    create?(data: Record<string, any>): Promise<string | number | T>;
    save?(saveData: Record<string, any>): Promise<string | number | T>;
    update?(updateData: Record<string, any>): Promise<string | number | T>;
    delete?(id: string | number): Promise<void | string | number | T>
}