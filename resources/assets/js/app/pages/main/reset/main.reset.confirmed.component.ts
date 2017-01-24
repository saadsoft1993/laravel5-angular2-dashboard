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


    constructor(private state:StateService,
                private toaster:ToasterService,
                private reset:ResetService) {
        this.params = state.params;

    }

    public params: any;

    public model = {
        password: '',
        repeat_password: ''
    }

    public errors = {}

    public submit() {
        this.reset
            .resetConfirmed(this.params.token, this.model.password, this.model.repeat_password)
            .subscribe((response) => {
                if (response.result) {
                    this.toaster.pop('success', 'Reset password', 'Password successfully changed');
                    return this.state.go('home');
                }
                this.toaster.pop('error', 'Reset password', 'Whoops, looks like something went wrong with the password reset');
                return false;
            }, (error) => {
                let response = error.json()
                if(response.errors.token){
                    this.toaster.pop('error', 'Reset password', response.errors.token);
                    return this.state.go('reset');
                }
                if (response.errors) {
                    this.errors = response.errors;
                    this.toaster.pop('error', 'Reset password', 'Enter the correct data');
                    return false;
                }
            });
    }
}