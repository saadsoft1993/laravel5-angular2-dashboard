import {Component} from '@angular/core';
import {RegisterService} from "../../../services/regiser.service";
import {StateService} from "ui-router-ng2";
import {ToasterService} from 'angular2-toaster';

@Component({
    // moduleId: module.id,
    selector: 'app-main-register',
    templateUrl: './main.register.html',

    providers: [RegisterService]
})
export class MainRegisterComponent {

    public model = {
        name: '',
        email: '',
        password: '',
        repeat_password: ''
    };

    public errors = {};

    public constructor(private register: RegisterService,
                       private state: StateService,
                       private toaster: ToasterService ){
    }

    public submit() {
        this.register
            .register(this.model.name, this.model.email, this.model.password, this.model.repeat_password)
            .subscribe((response) => {
                if (response.result) {
                    this.toaster.pop('success', 'Sign up', 'Registration successful');
                    return this.state.go('login');
                }
                this.toaster.pop('error', 'Sign up', 'Whoops, looks like something went wrong with the registration');
                return false;
            }, (error) => {
                let response = error.json()
                if(response.errors){
                    this.errors = response.errors;
                    this.toaster.pop('error', 'Sign up', 'Enter the correct data');
                    return false;
                }
            })
    }


}