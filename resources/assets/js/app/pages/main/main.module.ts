import {NgModule}      from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UIRouterModule} from 'ui-router-ng2';

import {MAIN_STATES} from './main.states'

import {MainLoginComponent} from './login/main.login.component';
import {MainLogoutComponent} from './logout/main.logout.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {MainHomeComponent} from './home/main.home.component';
import {NotFoundComponent} from './404/404.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIRouterModule.forChild({
            states: MAIN_STATES,
        })
    ],
    providers: [
    ],
    declarations: [
        MainHomeComponent,
        MainLoginComponent,
        MainLogoutComponent,
        MainRegisterComponent,
        MainResetComponent,
        MainResetConfirmedComponent,
        NotFoundComponent
    ],

    bootstrap: []
})
export class MainModule {

}