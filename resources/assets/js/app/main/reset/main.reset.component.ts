import {Component} from '@angular/core';
import {ResetService} from '../services/reset.service';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandlerService} from '../../core/services/error-handler.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-reset',
    templateUrl: './main.reset.html',
    providers: [ResetService, ErrorHandlerService]
})
export class MainResetComponent {

    constructor(private reset: ResetService,
                private toaster: ToasterService,
                private router: Router,
                private errorHandler: ErrorHandlerService) {
    }

    private title = 'Reset password';
    public model = {
        email: ''
    };
    public errors = {};

    public submit() {
        this.reset
            .reset(this.model.email)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'In your email message has been sent, follow the instructions');
                this.router.navigate(['login']);
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            });
    }


}