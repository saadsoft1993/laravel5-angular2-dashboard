import {Component, Input, Output, EventEmitter, ComponentFactoryResolver, QueryList} from '@angular/core';
import {SortItem} from '../../../core/services/page/SortItem';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {DataContainerDirective} from '../data-container.directive';
import {ViewChild, ViewChildren} from '@angular/core/src/metadata/di';
import {TableBaseDataComponent} from '../data-components/table.base-data.component';
import {TableHeadBaseComponent} from './elements/table.head.base.component';

@Component({
    selector: '[app-table-head]',
    templateUrl: './table.head.html',
    providers: []
})

export class TableHeadComponent {
    @Input() columnSettings: ColumnSettings[];

    @Output() sort: EventEmitter<SortItem> = new EventEmitter<SortItem>();
    @ViewChildren(DataContainerDirective) tableData: QueryList<DataContainerDirective>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        this.tableData.forEach((item, i) => {
            let settings = this.columnSettings[i];

            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(settings.headComponent);

            let componentRef = item.viewContainerRef.createComponent(componentFactory);
            (<TableHeadBaseComponent>componentRef.instance).settings = settings;
            (<TableHeadBaseComponent>componentRef.instance).sortEmitter = this.sort;
        });
    }
}