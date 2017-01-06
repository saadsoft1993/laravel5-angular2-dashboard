import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {UIRouterModule} from "ui-router-ng2";
// import { HttpModule } from '@angular/http';
// import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import {MainLoginComponent} from "./login/main.login.component";
import {MainLogoutComponent} from "./logout/main.logout.component";
import {MainRegisterComponent} from "./register/main.register.component";
import {MainResetComponent} from "./reset/main.reset.component";
import {Main404Component} from "./404/main.404.component";
import {MainHomeComponent} from "./home/main.home.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        // HttpModule,
        UIRouterModule.forRoot({
            states: [
                {
                    name: 'index',
                    url: '',
                    redirectTo: 'home',
                },
                {
                    name: 'home',
                    url: '/',
                    parent: 'default',
                    data:{
                        access:'@'
                    },
                    component: MainHomeComponent
                },
                {
                    name: 'login',
                    url: '/signin',
                    parent: 'blank',
                    data:{
                        access:'?'
                    },
                    component: MainLoginComponent
                },
                {
                    name: 'logout',
                    url: '/signout',
                    parent: 'blank',
                    data:{
                        access:'@'
                    },
                    component: MainLogoutComponent
                },
                {
                    name: 'register',
                    url: '/signup',
                    parent: 'blank',
                    data:{
                        access:'?'
                    },
                    component: MainRegisterComponent
                },
                {
                    name: 'reset',
                    url: '/reset',
                    parent: 'blank',
                    data:{
                        access:'?'
                    },
                    component: MainResetComponent
                },
                {
                    name: '404',
                    url: '/404',
                    parent: 'blank',
                    component: Main404Component
                }
            ],
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
        Main404Component
    ],

    bootstrap: []
})
export class MainModule {

}