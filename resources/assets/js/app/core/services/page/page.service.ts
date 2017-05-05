import {Injectable, Injector} from '@angular/core';
import {GetData, GetDataParams} from './GetData';
import {PageSource} from './PageSource';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Http} from '@angular/http';

@Injectable()
export abstract class PageService extends ApiService {

    private objects: { [index: string]: PageSource } = {};

    constructor(http: Http, protected router: Router) {
        super(http);
    }

    createObject(tag: string) {
        this.objects[tag] = new PageSource(tag, (params: GetDataParams) => this.getAll(params));
        return this.objects[tag];
    }

    getObject(tag: string) {
        return this.objects[tag];
    }

    protected getAll(options: GetDataParams) {
        return this.http.get(this.url, options.getQueryData())
            .map(this.map)
            .map(data => {
                this.getObject(options.tag).setMeta(data);
                return data.data;
            });
    }
}