import {Component} from '@angular/core';
import {ResetService} from '../../../services/reset.service';
import {StateService} from 'ui-router-ng2';
import {ToasterService} from 'angular2-toaster';
import {ErrorHandler} from '../../../services/error-handler.service';

@Component({
    selector: 'main-reset-confirmed',
    templateUrl: './main.reset.confirmed.html',
    providers: [ResetService, ErrorHandler]
})

export class MainResetConfirmedComponent {

    constructor(private state: StateService,
                private toaster: ToasterService,
                private reset: ResetService,
                private errorHandler: ErrorHandler) {
        this.params = state.params;
    }

    private title = 'Reset password';
    public params:any;
    public model = {
           password: '',
           repeat_password: ''
    }

    public errors = {}

    public submit() {
        this.reset
            .resetConfirmed(this.params.token, this.model.password, this.model.repeat_password)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'Password successfully changed');
                this.state.go('home');
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            });
    }
}