import {Injectable} from '@angular/core';
import {StateService} from 'ui-router-ng2';
import {GetData} from './GetData';
import {PageSource} from './PageSource';

@Injectable()
export class PageService {

    constructor(private state: StateService) {
    }

    getObject(tag: string, getData: GetData, pageUrl: boolean) {
        return new PageSource(tag, getData, this.state, pageUrl);
    }
}