import {ColumnSettings} from '../helpers/ColumnSettings';
import {PageService} from '../../../core/services/page/page.service';
import {Model} from '../../../core/Model';
import {Injector} from '@angular/core';
export abstract class TableBaseDataComponent {
    model: Model;
    settings: ColumnSettings;
    service:PageService;
    injector:Injector;
}