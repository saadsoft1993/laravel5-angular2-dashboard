import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandlerService} from '../../core/services/error-handler.service';
import {LoginService} from '../services/login.service';


@Component({
    selector: 'app-main-login',
    templateUrl: './main.login.html',
    providers: [AuthService, ErrorHandlerService]
})

export class MainLoginComponent {
    private title: string = 'Sign in';
    public model = {
        email: '',
        password: ''
    };
    public errors = {};

    public constructor(private login: LoginService, private toaster: ToasterService) {
    }

    public submit() {
        this.login.login(this.model.email, this.model.password).subscribe(() => {
            this.toaster.pop('success', this.title, 'Login successful');
        });
    }
}