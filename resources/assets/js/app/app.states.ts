import {Ng2StateDeclaration} from 'ui-router-ng2';
import {BlankLayout} from './layouts/blank/blank.layout';
import {DefaultLayout} from './layouts/default/default.layout';

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
    }
];