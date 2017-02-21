import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {StateService} from 'ui-router-ng2';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandler} from '../../../services/error-handler.service';

@Component({
    selector: 'app-main-login',
    templateUrl: './main.login.html',
    providers: [AuthService, ErrorHandler]
})

export class MainLoginComponent {

    private title: string = 'Sign in';
    public model = {
        email: '',
        password: ''
    };
    public errors = {};

    public constructor(private auth: AuthService,
                       private state: StateService,
                       private toaster: ToasterService,
                       private errorHandler: ErrorHandler) {
    }

    public submit() {
        this.auth
            .login(this.model.email, this.model.password)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Login successful');
                this.state.go('home');
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            });
    }
}