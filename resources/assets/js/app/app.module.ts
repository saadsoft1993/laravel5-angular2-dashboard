import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {MainModule} from './main/main.module';
import {UserModule} from './user/user.module';
import {ToasterModule} from 'angular2-toaster';
import {NotFoundModule} from './not-found/not-found.module';

@NgModule({
    imports: [
        BrowserModule,
        ToasterModule,
        CoreModule,

        MainModule,
        UserModule,
        NotFoundModule,
        RouterModule
    ],

    providers: [],

    declarations: [
        AppComponent,
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}