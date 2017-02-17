import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {StateService} from 'ui-router-ng2';

@Component({
    // moduleId: module.id,
    selector: 'app-main-logout',
    template: '',

    providers: [AuthService]
})
export class MainLogoutComponent{

    public constructor(
        private auth: AuthService,
        private state: StateService
    ) {
        this.auth.logout();
        this.state.go('login');
    }

}