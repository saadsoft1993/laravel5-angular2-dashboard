import {NgModule}      from '@angular/core';
import {UserListComponent} from './list/user.list.component';
import {UserFormComponent} from './form/user.form.component';
import {UserService} from './user.service';
import {SharedModule} from '../shared/shared.module';
import {TableEscapedDataComponent} from './list/table.escaped-data.component';
import {UserRoutesModule} from './user-routes.module';

@NgModule({
    imports: [
        SharedModule,
        UserRoutesModule
    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserFormComponent,
        TableEscapedDataComponent
    ],
    providers: [UserService],
    entryComponents: [UserFormComponent, TableEscapedDataComponent]
})
export class UserModule {
}