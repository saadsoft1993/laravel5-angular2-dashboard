import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.html',
    providers: []
})

export class SearchBarComponent {
    @Input() placeholder: string = '';
    @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
