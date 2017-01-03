import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {UIRouterModule} from "ui-router-ng2";
// import { HttpModule } from '@angular/http';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import {MainLoginComponent} from "./login/main.login.component";
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
                    component: MainHomeComponent
                },
                {
                    name: 'signin',
                    url: '/signin',
                    parent: 'blank',
                    component: MainLoginComponent
                },
                {
                    name: 'signup',
                    url: '/signup',
                    parent: 'blank',
                    component: MainRegisterComponent
                },
                {
                    name: 'reset',
                    url: '/reset',
                    parent: 'blank',
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
        MainRegisterComponent,
        MainResetComponent,
        Main404Component
    ],

    bootstrap: []
})
export class MainModule {

}