
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {notFoundRoutes} from './notFoundRoutes';
import {NotFoundComponent} from './404/404.component';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(notFoundRoutes)
    ],
    exports: [],
    declarations: [
        NotFoundComponent
    ],
})
export class NotFoundModule {
}