import {Component} from '@angular/core';

@Component({
    selector: 'app-main-user-form',
    templateUrl: './main.user.form.html'
})
export class UserFormComponent {
    public constructor() {
        console.log('form component constructed')
    }

}