import {NgModule}      from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {UIRouterModule} from 'ui-router-ng2';

import {MAIN_STATES} from './main.states'

import {MainLoginComponent} from './login/main.login.component';
import {MainLogoutComponent} from './logout/main.logout.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {Main404Component} from './404/main.404.component';
import {MainHomeComponent} from './home/main.home.component';

import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UIRouterModule.forRoot({
            states: MAIN_STATES,
            otherwise: {
                state: '404'
            },
        })
    ],

    declarations: [
        MainHomeComponent,
        MainLoginComponent,
        MainLogoutComponent,
        MainRegisterComponent,
        MainResetComponent,
        MainResetConfirmedComponent,
        Main404Component,
    ],

    bootstrap: []
})
export class MainModule {

}