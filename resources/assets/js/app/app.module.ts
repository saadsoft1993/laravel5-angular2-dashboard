import {NgModule} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "@angular/common";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UIRouterModule} from "ui-router-ng2";
import {RestangularModule} from 'ng2-restangular';
import {ToasterModule} from 'angular2-toaster';

import {AppComponent} from "./app.component";
import {MainModule} from "./pages/main/main.module";

import {DefaultLayout} from "./layouts/default/default.layout";
import {BlankLayout} from "./layouts/blank/blank.layout";

import {AuthService} from "./services/auth.service";

@NgModule({
    imports: [
        ToasterModule,
        RestangularModule.forRoot((RestangularProvider) => {
                RestangularProvider.setBaseUrl('/api/v1');
                RestangularProvider.setFullResponse(true);
            }
        ),
        NgbModule.forRoot(),
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
                    parent: 'blank',
                    component: DefaultLayout
                }
            ]
        }),
        MainModule
    ],

    providers: [
        AuthService,
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