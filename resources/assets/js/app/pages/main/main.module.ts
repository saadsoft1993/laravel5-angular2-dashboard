import {NgModule}      from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {UIRouterModule} from 'ui-router-ng2';

import {MAIN_STATES} from './main.states'

import {MainLoginComponent} from './login/main.login.component';
import {MainLogoutComponent} from './logout/main.logout.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {MainHomeComponent} from './home/main.home.component';

import {CommonModule} from '@angular/common';
import {UserService} from '../user/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIRouterModule.forChild({
            states: MAIN_STATES,
        })
    ],
    providers: [
        UserService
    ],
    declarations: [
        MainHomeComponent,
        MainLoginComponent,
        MainLogoutComponent,
        MainRegisterComponent,
        MainResetComponent,
        MainResetConfirmedComponent,
    ],

    bootstrap: []
})
export class MainModule {

}