import {Component} from '@angular/core';
import {ErrorHandlerService} from '../../core/services/error-handler.service';
import {ToasterService} from 'angular2-toaster';
import {UserService} from '../user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user.form.html'
})
export class UserFormComponent {
    private title = 'Create user';
    // public model: RegisterUser = new RegisterUser;
    public errors = {};

    public constructor(private userService: UserService,
                       private toaster: ToasterService,
                       private errorHandler: ErrorHandlerService,
    ) {
    }

    public submit() {
/*        this.userService
            .create(this.model)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'RegisterUser created successfully');
                this.pageService.getObject('users').getPage(1);
                // this.state.go('users');
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            })*/
    }
}