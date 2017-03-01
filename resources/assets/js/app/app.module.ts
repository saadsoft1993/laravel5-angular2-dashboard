import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {MainModule} from './main/main.module';
import {UserModule} from './user/user.module';
import {UIRouterModule} from 'ui-router-ng2';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
    imports: [
        BrowserModule,
        ToasterModule,
        UIRouterModule,
        MainModule,
        UserModule,
        CoreModule,
    ],

    providers: [

    ],

    declarations: [
        AppComponent,
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}