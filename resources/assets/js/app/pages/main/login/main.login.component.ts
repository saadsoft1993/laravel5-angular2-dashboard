import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {StateService} from "ui-router-ng2";
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-main-login',
    templateUrl: './main.login.html',
    providers: [AuthService]
})

export class MainLoginComponent {

    private title:string = 'Sign in';
    public model = {
           email: '',
           password: ''
    };
    public errors = {};

    public constructor(private auth: AuthService,
                       private state: StateService,
                       private toaster: ToasterService) {
    }

    public submit() {
        this.auth
            .login(this.model.email, this.model.password)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Login successful');
                this.state.go('home');
            }, (error) => {
                if (this.errors = error.errors || error.message) {
                    return this.toaster.pop('error', this.title, error.message ? error.message : 'Enter the correct data');
                }
            });
    }

}