import {Ng2StateDeclaration} from 'ui-router-ng2';
import {BlankLayout} from './layouts/blank/blank.layout';
import {DefaultLayout} from './layouts/default/default.layout';
import {NotFoundComponent} from './pages/404/404.component';

export let APP_STATES: Ng2StateDeclaration[] = [
    {
        name: 'blank',
        abstract: true,
        component: BlankLayout
    },
    {
        name: 'default',
        abstract: true,
        parent: 'blank',
        component: DefaultLayout
    },
    {
        name: '404',
        url: '/404',
        parent: 'blank',
        component: NotFoundComponent
    }
];