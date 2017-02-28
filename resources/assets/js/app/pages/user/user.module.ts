import {NgModule}      from '@angular/core';
import {UIRouterModule} from 'ui-router-ng2';
import {USER_STATES} from './user.states';
import {UserListComponent} from './list/user.list.component';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from './form/user.form.component';
import {TableModule} from '../../modules/table/table.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        UIRouterModule.forChild({states: USER_STATES})
    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    entryComponents: [UserFormComponent]
})
export class UserModule {
}