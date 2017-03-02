import {NgModule, Optional, SkipSelf} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import {HeaderComponent} from './sidebar/header/header.component';
import {TemplateOptionsComponent} from './sidebar/template-options/template-options.component';
import {SidebarLeftComponent} from './sidebar/sidebar-left/sidebar-left.component';
import {SidebarRightComponent} from './sidebar/sidebar-right/sidebar-right.component';
import {MainSidebarComponent} from './sidebar/sidebar.component';
import {AuthService} from '../main/services/auth.service';
import {BlankLayout} from './layouts/blank/blank.layout';
import {DefaultLayout} from './layouts/default/default.layout';
import {ToasterModule} from 'angular2-toaster';
import {SlimScrollModule} from 'ng2-slimscroll';
import {RestangularModule} from 'ng2-restangular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UIRouterModule} from 'ui-router-ng2';
import {CORE_STATES} from './core.states';
import {PageService} from './services/page/page.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ToasterModule,
        SharedModule,
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
            states: CORE_STATES,
            otherwise: '404',
        }),
    ],

    providers: [
        AuthService,
        PageService,
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
        //default menu
        MainSidebarComponent,
        SidebarRightComponent,
        SidebarLeftComponent,
        TemplateOptionsComponent,
        HeaderComponent
    ],

    exports: [
        BlankLayout,
        DefaultLayout,
        MainSidebarComponent,
        SidebarRightComponent,
        SidebarLeftComponent,
        TemplateOptionsComponent,
        HeaderComponent
    ],

    bootstrap: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}