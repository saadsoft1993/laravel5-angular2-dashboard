import {Component} from "@angular/core";
import {ResetService} from "../../../services/reset.service";
import {ToasterService} from "angular2-toaster";
import {StateService} from "ui-router-ng2";

@Component({
    // moduleId: module.id,
    selector: 'app-main-reset',
    templateUrl: './main.reset.html',
    providers: [ResetService]
})
export class MainResetComponent {
    constructor(private reset: ResetService,
                private toaster: ToasterService,
                private state: StateService) {
    }

    public model = {
        email: ''
    };

    public errors = {};

    public submit() {
        this.reset
            .reset(this.model.email)
            .subscribe((response) => {
                if (response.result) {
                    this.toaster.pop('success', 'Reset password', 'In your email message has been sent, follow the instructions');
                    return this.state.go('home');
                }
                this.toaster.pop('error', 'Reset password', 'Whoops, looks like something went wrong with the reset password');
                return false;
            }, (error) => {
                let response = error.json()
                if (response.errors) {
                    this.errors = response.errors;
                    this.toaster.pop('error', 'Reset password', 'Enter the correct data');
                    return false;
                }
            });
    }



}