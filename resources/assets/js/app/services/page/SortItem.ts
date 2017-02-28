export class SortItem {
    static readonly Default: string = '';
    static readonly Ascending: string = 'asc';
    static readonly Descending: string = 'desc';

    private dir: string = SortItem.Default;

    constructor(public prop: string) {
    }

    public next() {
        switch (this.dir) {
            case SortItem.Default:
                this.dir = SortItem.Ascending;
                break;
            case SortItem.Ascending:
                this.dir = SortItem.Descending;
                break;
            default:
                this.reset();
        }
    }

    public reset() {
        this.dir = SortItem.Default;
    }

    public getDir() {
        return this.dir;
    }

    isAsc() {
        return this.dir === SortItem.Ascending;
    }

    isDesc() {
        return this.dir === SortItem.Descending;
    }

    isDefault() {
        return this.dir === SortItem.Default;
    }
}
