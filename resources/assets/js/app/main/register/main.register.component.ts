import {Component} from '@angular/core';
import {RegisterService} from '../services/regiser.service';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandlerService} from '../../core/services/error-handler.service';
import {Router} from '@angular/router';
import {RegisterUser} from './register-user.model';

@Component({
    selector: 'app-main-register',
    templateUrl: './main.register.html',
    providers: [RegisterService, ErrorHandlerService]
})
export class MainRegisterComponent {

    private title = 'Sign up';
    public model: RegisterUser = new RegisterUser;
    public errors = {};

    public constructor(private register: RegisterService,
                       private router: Router,
                       private toaster: ToasterService,
                       private errorHandler: ErrorHandlerService) {
    }

    public submit() {
        this.register
            .register(this.model)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Registration successful');
                this.router.navigate(['login']);
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            })
    }
}