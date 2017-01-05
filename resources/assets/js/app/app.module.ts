import {NgModule}      from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "@angular/common";
// import { HttpModule, BaseRequestOptions, Http } from '@angular/http';

import {UIRouterModule} from "ui-router-ng2";
import {RestangularModule} from './modules/ng2-restangular';
// import {RestangularModule} from "ng2-restangular";
// import { AUTH_PROVIDERS } from 'angular2-jwt';
// import {ToasterModule, ToasterService} from 'angular2-toaster';

import {AppComponent} from "./app.component";
import {MainModule} from "./pages/main/main.module";

import {DefaultLayout} from "./layouts/default/default.layout";
import {BlankLayout} from "./layouts/blank/blank.layout";

@NgModule({
    imports: [

        // BrowserModule,
        // HttpModule,

        // ToasterModule,
        RestangularModule.forRoot((RestangularProvider) => {
                RestangularProvider.setBaseUrl('/api/v1');
                RestangularProvider.setFullResponse(true);
                // RestangularProvider.setBaseUrl('http://api.test.local/v1');
                // RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});

                // RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
                //     if (response.status === 403) {

                        // refreshAccesstoken()
                        //     .switchMap(refreshAccesstokenResponse => {
                        //         //If you want to change request or make with it some actions and give the request to the repeatRequest func.
                        //         //Or you can live it empty and request will be the same.
                        //         return response.repeatRequest(response.request);
                        //     })
                        //     .subscribe(
                        //         res => responseHandler(res),
                        //         err => subject.error(err)
                        //     );

                        // return false; // error handled
                    // }
                    // return true; // error not handled
                // });

            }
        ),
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
        MainModule
    ],

    providers: [
        // RestangularHttp, Restangular,
        // RestangularHttp,
        AUTH_PROVIDERS,
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