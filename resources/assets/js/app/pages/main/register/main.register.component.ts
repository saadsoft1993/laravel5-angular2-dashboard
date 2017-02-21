import {Component} from '@angular/core';
import {RegisterService} from '../../../services/regiser.service';
import {StateService} from 'ui-router-ng2';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandler} from '../../../services/error-handler.service';

@Component({
    selector: 'app-main-register',
    templateUrl: './main.register.html',
    providers: [RegisterService, ErrorHandler]
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
                       private toaster: ToasterService,
                       private errorHandler: ErrorHandler) {
    }

    public submit() {
        this.register
            .register(this.model.name, this.model.email, this.model.password, this.model.repeat_password)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Registration successful');
                this.state.go('login');
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            })
    }
}