import {Component} from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'app-main-reset',
    templateUrl: './main.reset.html'
})
export class MainResetComponent {

    model = {
        // email: 'test',
        // password: 'test2'
    };

    errors = {};

    // get diagnostic() {
    //     return JSON.stringify(this.model);
    // }

    submit() {
        // this.errors = {
        //     email: ['test error']
        // };
        // console.log(this.model);

    }


}