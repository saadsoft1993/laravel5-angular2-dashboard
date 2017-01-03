import {NgModule}      from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "@angular/common";
// import { HttpModule, BaseRequestOptions, Http } from '@angular/http';

import {UIRouterModule} from "ui-router-ng2";
import {RestangularModule} from './modules/ng2-restangular';
// import {RestangularModule} from "ng2-restangular";

import {AppComponent} from "./app.component";
import {MainModule} from "./pages/main/main.module";

import {DefaultLayout} from "./layouts/default/default.layout";
import {BlankLayout} from "./layouts/blank/blank.layout";

@NgModule({
    imports: [

        // BrowserModule,
        // HttpModule,

        RestangularModule.forRoot((RestangularProvider) => {
                RestangularProvider.setBaseUrl('http://api.test.local/v1');
                RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
            }
        ),
        MainModule,
        UIRouterModule.forChild({
            states: [
                {
                    name: 'blank',
                    abstract: true,
                    component: BlankLayout
                },
                {
                    name: 'default',
                    abstract: true,
                    // parent: 'blank',
                    component: DefaultLayout


                }
            ]
        }),

    ],

    providers: [
        // RestangularHttp, Restangular,
        // RestangularHttp,
        {
            provide: APP_BASE_HREF,
            useValue: '/',
            // includeHash: true
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],

    declarations: [
        BlankLayout,
        DefaultLayout,
        AppComponent
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}