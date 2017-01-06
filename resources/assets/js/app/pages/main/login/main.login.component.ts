import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {StateService} from "ui-router-ng2";
import {ToasterService} from 'angular2-toaster';

@Component({
    // moduleId: module.id,
    selector: 'app-main-login',
    templateUrl: './main.login.html',

    providers: [AuthService]
})
export class MainLoginComponent {

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
            .subscribe((response) => {
                if (response) {
                    this.state.go('home');
                    this.toaster.pop('success', 'Sign in', 'Login successful');
                } else {
                    this.toaster.pop('error', 'Sign in', 'Whoops, your password or email are incorrect');
                }
            });
    }


}