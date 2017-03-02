import {Component} from '@angular/core';
import {ErrorHandler} from '../../core/services/error-handler.service';
import {ToasterService} from 'angular2-toaster';
import {StateService} from 'ui-router-ng2';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {PageService} from '../../core/services/page/page.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user.form.html'
})
export class UserFormComponent {
    private title = 'Create user';
    public model: User = new User;
    public errors = {};

    public constructor(private userService: UserService,
                       private state: StateService,
                       private toaster: ToasterService,
                       private errorHandler: ErrorHandler,
                       private pageService: PageService) {
    }

    public submit() {
        this.userService
            .create(this.model)
            .subscribe(() => {
                this.toaster.pop('success', this.title, 'User created successfully');
                this.pageService.getObject('users').getPage(1);
                this.state.go('users');
            }, error => {
                this.errors = error;
                this.errorHandler.handle(error, this.title)
            })
    }
}