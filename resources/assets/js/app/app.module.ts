import {NgModule} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "@angular/common";

import {UIRouterModule} from "ui-router-ng2";
import {RestangularModule} from './modules/ng2-restangular';
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
                // RestangularProvider.setBaseUrl('http://api.test.local/v1');
                // let auth = injector.get(AuthService);

                // if (auth.isAuthenticated()) {
                //     RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer ' + auth.getToken()});
                // }

                // RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params)=> {
                //     return {
                //         params: params,//Object.assign({}, params, {sort:"name"}),
                //         headers: Object.assign({},headers,{'test':'test 123'}),
                //         element: element
                //     };
                // });
            }
        ),
        UIRouterModule.forChild({
            configClass: AuthService,
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
        // {
        //     provide: AuthService,
        //     useFactory: ()=>{return true},
        //     deps: [Restangular]
        // },
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
        // AuthService,
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