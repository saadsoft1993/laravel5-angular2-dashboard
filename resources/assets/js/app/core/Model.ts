import {InjectionToken} from '@angular/core';
import {CrudService} from './services/crud.service';
export abstract class Model {
    get pk() {
        return this[this._pk];
    }

    protected get _pk(): string {
        return 'id';
    }

    public load(data: any) {
        for (let prop in data) {
            if (data.hasOwnProperty(prop) && (this.hasOwnProperty(prop) || prop === this._pk)) {
                this[prop] = data[prop];
            }
        }
        return this;
    }

    abstract get service(): any;
}
