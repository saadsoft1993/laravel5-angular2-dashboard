import {Component} from '@angular/core';
// import {Restangular} from "ng2-restangular";
import {Restangular} from '../../../modules/ng2-restangular';
// import { HttpModule, BaseRequestOptions, Http } from '@angular/http';

@Component({
    // moduleId: module.id,
    selector: 'app-main-login',
    templateUrl: './main.login.html'
})
export class MainLoginComponent {

    model = {
        // email: 'test',
        // password: 'test2'
    };

    errors = {};
    // restangular = {};

    constructor(private restangular: Restangular) {
    }

    // get diagnostic() {
    //     return JSON.stringify(this.model);
    // }

    // ngOnInit(): void {
        // this.restangular = Restangular;
        // console.log(this.template);
    // }

    submit() {
        this.errors = {
            email: ['test error']
        };


        this.restangular.one('users', 2).all('accounts').getList();
        console.log(this.model);
        // console.log(this.restangular.one('users', 2).get());
    }


}