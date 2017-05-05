import {NgModule}      from '@angular/core';

import {MainLoginComponent} from './login/main.login.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {MainHomeComponent} from './home/main.home.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';
import {LoginService} from './services/login.service';
import {MainRoutesModule} from './main-routes.module';

@NgModule({
    imports: [
        SharedModule,
        MainRoutesModule
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        LoginService
    ],
    declarations: [
        MainHomeComponent,
        MainLoginComponent,
        MainRegisterComponent,
        MainResetComponent,
        MainResetConfirmedComponent,
    ],

    bootstrap: []
})
export class MainModule {

}