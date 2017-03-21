import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[app-table-data-container]',
})
export class DataContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}