import {Injectable} from '@angular/core';
import {StateService} from 'ui-router-ng2';
import {GetData} from './GetData';
import {PageSource} from './PageSource';

@Injectable()
export class PageService {

    private objects: {[index: string]: PageSource} = {};

    constructor(private state: StateService) {
    }

    createObject(tag: string, getData: GetData, pageUrl: boolean) {
        this.objects[tag] = new PageSource(tag, getData, this.state, pageUrl);
        return this.objects[tag];
    }

    getObject(tag: string) {
        return this.objects[tag];
    }
}