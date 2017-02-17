import {NgModule}      from '@angular/core';
import {UIRouterModule} from 'ui-router-ng2';

import {USER_STATES} from './main.user.states';

import {UserListComponent} from './list/main.user.list.component';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from './form/main.user.form.component';

@NgModule({
    imports: [
        CommonModule,
        UIRouterModule.forChild({states: USER_STATES})
    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserFormComponent
    ],
    entryComponents: [UserFormComponent]
})
export class MainUserModule {
    public constructor() {
        console.log('user module constructed')
    }
}