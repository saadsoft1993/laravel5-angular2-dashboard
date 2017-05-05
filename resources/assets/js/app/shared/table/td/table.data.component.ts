import {Component, Input, ComponentFactoryResolver, ViewChild, Injector} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {DataContainerDirective} from '../data-container.directive';
import {TableBaseDataComponent} from '../data-components/table.base-data.component';
import {PageService} from '../../../core/services/page/page.service';

@Component({
    selector: '[app-table-data]',
    templateUrl: './table.data.html',
    providers: []
})

export class TableDataComponent {
    @Input() column: ColumnSettings;
    @Input() model: any;
    @Input() service: PageService;

    @ViewChild(DataContainerDirective) tableData: DataContainerDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector:Injector) {
    }

    ngOnInit() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.column.bodyComponent);
        let componentRef = this.tableData.viewContainerRef.createComponent(componentFactory);
        (<TableBaseDataComponent>componentRef.instance).model = this.model;
        (<TableBaseDataComponent>componentRef.instance).settings = this.column;
        (<TableBaseDataComponent>componentRef.instance).service = this.service;
        (<TableBaseDataComponent>componentRef.instance).injector = this.injector;
    }
}