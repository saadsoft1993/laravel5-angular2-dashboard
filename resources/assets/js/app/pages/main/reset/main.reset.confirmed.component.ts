import {Component} from '@angular/core';
import {ResetService} from '../../../services/reset.service.ts';
import {StateService} from 'ui-router-ng2';
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'main-reset-confirmed',
    templateUrl: './main.reset.confirmed.html',
    providers: [ResetService]
})

export class MainResetConfirmedComponent {

    constructor(private state: StateService,
                private toaster: ToasterService,
                private reset: ResetService) {
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
            }, (error) => {
                if (error.errors.token) {
                    this.toaster.pop('error', this.title, error.errors.token);
                    this.state.go('reset');
                }
                if (this.errors = error.errors) {
                    this.toaster.pop('error', this.title, 'Enter the correct data');
                }
            });
    }
}