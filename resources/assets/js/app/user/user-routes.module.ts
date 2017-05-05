import {NgModule}      from '@angular/core';
import {UserListComponent} from './list/user.list.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../main/guards/auth.guard';
import {DefaultLayout} from '../core/layouts/default/default.layout';

const userRoutes: Routes = [
    {
        path: '',
        component: DefaultLayout,
        canActivate: [AuthGuard],
        children: [
            {path: 'users', component: UserListComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutesModule {
}