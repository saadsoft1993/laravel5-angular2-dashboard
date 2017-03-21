import {Component, Input, ComponentFactoryResolver} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {ViewChild} from '@angular/core/src/metadata/di';
import {DataContainerDirective} from '../data-container.directive';
import {TableBaseDataComponent} from '../data-components/table.base-data.component';

@Component({
    selector: '[app-table-data]',
    templateUrl: './table.data.html',
    providers: []
})

export class TableDataComponent {
    @Input() column: ColumnSettings;
    @Input() row: any;

    @ViewChild(DataContainerDirective) tableData: DataContainerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }


    ngOnInit() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.column.bodyComponent);
        let componentRef = this.tableData.viewContainerRef.createComponent(componentFactory);
        (<TableBaseDataComponent>componentRef.instance).row = this.row;
        (<TableBaseDataComponent>componentRef.instance).settings = this.column;
    }
}