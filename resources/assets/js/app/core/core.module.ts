import {Injector, NgModule, Optional, SkipSelf} from '@angular/core';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {ErrorHandlerService} from './services/error-handler.service';
import {HttpService} from './services/http.service';

const coreRoutes: Routes = [];

@NgModule({
    imports: [
        ToasterModule,
        SharedModule,
        SlimScrollModule,
        NgbModule.forRoot(),
        HttpModule,
        RouterModule.forRoot(coreRoutes)
    ],

    providers: [
        AuthService,
        ErrorHandlerService,
        {
            provide: Http,
            useFactory: (backend: XHRBackend, options: RequestOptions, error: ErrorHandlerService, auth: AuthService) => {
                return new HttpService(backend, options, error, auth);
            },
            deps: [XHRBackend, RequestOptions, ErrorHandlerService, AuthService]
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
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}