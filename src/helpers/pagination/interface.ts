export const DEFAULT_TAKE_VALUE = 10
export interface Pageable {
    createdAt: Date;
}

export interface PaginationOptions {
    limit?: number;
    after?: string;
    before?: string;
    dec?: boolean;
}
