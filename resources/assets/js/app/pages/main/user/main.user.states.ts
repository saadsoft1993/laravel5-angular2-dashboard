import {Ng2StateDeclaration} from 'ui-router-ng2';

import {UserListComponent} from './list/main.user.list.component';
import {UserFormComponent} from './form/main.user.form.component';

export let USER_STATES: Ng2StateDeclaration[] = [
    {
        name: 'users',
        url: '/users/list',
        parent: 'default',
        component: UserListComponent
    },
    {
        name: 'user_form',
        parent: 'default',
        url: '/users/form',
        component: UserFormComponent
    }
];