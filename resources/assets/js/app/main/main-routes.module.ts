import {NgModule}      from '@angular/core';
import {MainLoginComponent} from './login/main.login.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {MainHomeComponent} from './home/main.home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';
import {DefaultLayout} from '../core/layouts/default/default.layout';
import {BlankLayout} from '../core/layouts/blank/blank.layout';

const mainRoutes: Routes = [
    {
        path: '',
        component: BlankLayout,
        children: [
            {
                path: '',
                component: DefaultLayout,
                canActivate: [AuthGuard],
                children: [
                    {path: '', component: MainHomeComponent}
                ]
            },
            {
                path: '',
                canActivate: [NoAuthGuard],
                children: [
                    {path: 'login', component: MainLoginComponent},
                    {path: 'register', component: MainRegisterComponent},
                    {path: 'reset', component: MainResetComponent},
                    {path: 'reset-confirmed/:token', component: MainResetConfirmedComponent},
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [RouterModule]
})
export class MainRoutesModule {

}