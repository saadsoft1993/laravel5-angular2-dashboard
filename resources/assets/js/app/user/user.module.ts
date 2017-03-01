import {NgModule}      from '@angular/core';
import {UIRouterModule} from 'ui-router-ng2';
import {USER_STATES} from './user.states';
import {UserListComponent} from './list/user.list.component';
import {UserFormComponent} from './form/user.form.component';
import {UserService} from './user.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        UIRouterModule.forChild({states: USER_STATES})
    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    providers: [UserService],
    entryComponents: [UserFormComponent]
})
export class UserModule {
}