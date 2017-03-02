import {Component, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core/src/metadata/directives';

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
