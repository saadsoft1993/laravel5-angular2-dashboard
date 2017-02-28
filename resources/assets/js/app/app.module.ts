import {NgModule} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UIRouterModule} from 'ui-router-ng2';
import {RestangularModule} from 'ng2-restangular';
import {ToasterModule} from 'angular2-toaster';
import {SlimScrollModule} from 'ng2-slimscroll';


import {AppComponent} from './app.component';
import {MainModule} from './pages/main/main.module';

import {DefaultLayout} from './layouts/default/default.layout';
import {BlankLayout} from './layouts/blank/blank.layout';

import {AuthService} from './services/auth.service';

// default menu
import {MainSidebarComponent} from './layouts/_sidebar/sidebar.component';
import {HeaderComponent} from './layouts/_sidebar/header/header.component';
import {SidebarRightComponent} from './layouts/_sidebar/sidebar-right/sidebar-right.component';
import {SidebarLeftComponent} from './layouts/_sidebar/sidebar-left/sidebar-left.component';
import {TemplateOptionsComponent} from './layouts/_sidebar/template-options/template-options.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_STATES} from './app.states';
import {NotFoundComponent} from './pages/404/404.component';
import {PageService} from './services/page/page.service';
import {UserService} from './services/user.service';
import {UserModule} from "./pages/user/user.module";

@NgModule({
    imports: [
        BrowserModule,
        ToasterModule,
        SlimScrollModule,
        RestangularModule.forRoot((RestangularProvider) => {
                RestangularProvider.setBaseUrl('/api/v1');
                RestangularProvider.setFullResponse(true);

                RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
                    if (operation === 'getList') {
                        data.data._meta = {
                            total: data.total,
                            per_page: data.per_page,
                            current_page: data.current_page,
                        };
                        return data.data;
                    }
                    return data;
                });
            }
        ),
        NgbModule.forRoot(),
        UIRouterModule.forRoot({
            states: APP_STATES,
            otherwise: {
                state: '404'
            },
        }),
        MainModule,
        UserModule
    ],

    providers: [
        AuthService,
        PageService,
        UserService,
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
        AppComponent,
        NotFoundComponent,
        //default menu
        MainSidebarComponent,
        SidebarRightComponent,
        SidebarLeftComponent,
        TemplateOptionsComponent,
        HeaderComponent
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}