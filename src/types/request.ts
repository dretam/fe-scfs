export interface BaseListRequest {
    page?: number | null;
    perPage?: number | null;
    filter?: string | null;
    sort?: string | null;
    expands?: string | null;
}

export interface BaseRetrieveRequest {
    id: number;
    expands?: string | null;
}
