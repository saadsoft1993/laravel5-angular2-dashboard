import {Injectable} from '@angular/core';
import {StateService} from 'ui-router-ng2';
import {GetData} from './GetData';
import {PageSource} from './PageSource';
import {PageMeta} from './PageMeta';
import {SortItem} from './SortItem';

@Injectable()
export class PageService {

    constructor(private state: StateService) {
    }

    getObject(tag: string, getData: GetData, pageUrl: boolean) {
        return new PageSource(tag, getData, this.state, pageUrl);
    }
}

export {GetData, PageSource, PageMeta, SortItem};
