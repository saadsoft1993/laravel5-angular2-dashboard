import {Component} from "@angular/core";
import {ResetService} from "../../../services/reset.service";
import {ToasterService} from "angular2-toaster";
import {StateService} from "ui-router-ng2";

@Component({
    selector: 'app-main-reset',
    templateUrl: './main.reset.html',
    providers: [ResetService]
})
export class MainResetComponent {

    constructor(private reset: ResetService,
                private toaster: ToasterService,
                private state: StateService) {
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
                return this.state.go('home');
            }, (error) => {
                if (this.errors = error.errors) {
                    this.toaster.pop('error', this.title, 'Enter the correct data');
                }
            });
    }


}