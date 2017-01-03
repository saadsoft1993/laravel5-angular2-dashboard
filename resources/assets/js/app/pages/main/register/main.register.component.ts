import {Component} from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'app-main-register',
    templateUrl: './main.register.html'
})
export class MainRegisterComponent {

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