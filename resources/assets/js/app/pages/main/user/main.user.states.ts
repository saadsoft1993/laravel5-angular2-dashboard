import {Ng2StateDeclaration} from 'ui-router-ng2';

import {UserListComponent} from './list/main.user.list.component';
import {UserFormComponent} from './form/main.user.form.component';

export let USER_STATES: Ng2StateDeclaration[] = [
    {
        name: 'users',
        url: '/users',
        parent: 'default',
        component: UserListComponent
    },
    {
        name: 'users.form',
        url: '/form',
        component: UserFormComponent
    }
];