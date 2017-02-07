import {NgModule} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy, CommonModule} from "@angular/common";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UIRouterModule} from "ui-router-ng2";
import {RestangularModule} from 'ng2-restangular';
import {ToasterModule} from 'angular2-toaster';
import {SlimScrollModule} from 'ng2-slimscroll';


import {AppComponent} from "./app.component";
import {MainModule} from "./pages/main/main.module";

import {DefaultLayout} from "./layouts/default/default.layout";
import {BlankLayout} from "./layouts/blank/blank.layout";

import {AuthService} from "./services/auth.service";

// default menu
import {MainSidebarComponent} from "./layouts/_sidebar/sidebar.component";
import {HeaderComponent} from "./layouts/_sidebar/header/header.component";
import {SidebarRightComponent} from "./layouts/_sidebar/sidebar-right/sidebar-right.component";
import {SidebarLeftComponent} from "./layouts/_sidebar/sidebar-left/sidebar-left.component";
import {TemplateOptionsComponent} from "./layouts/_sidebar/template-options/template-options.component";

@NgModule({
    imports: [
        CommonModule,
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
                },
            ]
        }),
        MainModule,
        SlimScrollModule

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
        AppComponent,
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