export class PageMeta {
    public page: number;
    public total: number;
    public perPage: number;

    public set(meta: any) {
        this.perPage = meta.per_page;
        this.total = meta.total;
        this.page = meta.current_page;
    }
}