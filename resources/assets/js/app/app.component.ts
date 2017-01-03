import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app',
    template: '<ui-view></ui-view>'
    // template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{

    // template?;

    ngOnInit(): void {
        // console.log(this.template);
    }

}