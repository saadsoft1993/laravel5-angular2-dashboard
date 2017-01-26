import {Component} from '@angular/core';
import {RegisterService} from "../../../services/regiser.service";
import {StateService} from "ui-router-ng2";
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-main-register',
    templateUrl: './main.register.html',
    providers: [RegisterService]
})
export class MainRegisterComponent {

    private title = 'Sign up';
    public model = {
           name: '',
           email: '',
           password: '',
           repeat_password: ''
    };
    public errors = {};

    public constructor(private register: RegisterService,
                       private state: StateService,
                       private toaster: ToasterService) {
    }


    public submit() {
        this.register
            .register(this.model.name, this.model.email, this.model.password, this.model.repeat_password)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Registration successful');
                this.state.go('login');
            }, (error) => {
                if (this.errors = error.errors) {
                    this.toaster.pop('error', this.title, 'Enter the correct data');
                }
            })
    }


}