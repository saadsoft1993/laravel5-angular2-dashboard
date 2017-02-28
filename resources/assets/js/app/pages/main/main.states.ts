import {Ng2StateDeclaration} from 'ui-router-ng2';
import {MainLoginComponent} from './login/main.login.component';
import {MainLogoutComponent} from './logout/main.logout.component';
import {MainRegisterComponent} from './register/main.register.component';
import {MainResetComponent} from './reset/main.reset.component';
import {MainResetConfirmedComponent} from './reset/main.reset.confirmed.component';
import {MainHomeComponent} from './home/main.home.component';
import {NotFoundComponent} from './404/404.component';


export let MAIN_STATES: Ng2StateDeclaration[] = [
    {
        name: 'index',
        url: '',
        redirectTo: 'home',
    },
    {
        name: 'home',
        url: '/',
        parent: 'default',
        data: {
            access: '@'
        },
        component: MainHomeComponent
    },
    {
        name: 'login',
        url: '/signin',
        parent: 'blank',
        data: {
            access: '?'
        },
        component: MainLoginComponent
    },
    {
        name: 'logout',
        url: '/signout',
        parent: 'blank',
        data: {
            access: '@'
        },
        component: MainLogoutComponent
    },
    {
        name: 'register',
        url: '/signup',
        parent: 'blank',
        data: {
            access: '?'
        },
        component: MainRegisterComponent
    },
    {
        name: 'reset',
        url: '/reset',
        parent: 'blank',
        data: {
            access: '?'
        },
        component: MainResetComponent
    },
    {
        name: 'reset-confirmed',
        url: '/reset-confirmed/:token',
        parent: 'blank',
        data: {
            access: '?'
        },
        component: MainResetConfirmedComponent
    },
    {
        name: 'admin',
        url: '/admin',
        parent: 'admin-layout',
        data: {
            access: '@'
        },
        component: MainHomeComponent
    },
    {
        name: '404',
        url: '/404',
        parent: 'blank',
        component: NotFoundComponent
    }
];