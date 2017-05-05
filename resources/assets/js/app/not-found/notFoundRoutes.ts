import {Routes} from '@angular/router';
import {BlankLayout} from '../core/layouts/blank/blank.layout';
import {NotFoundComponent} from './404/404.component';

export const notFoundRoutes: Routes = [
    {
        path: '', component: BlankLayout, children: [
        {path: '**', component: NotFoundComponent}
    ]
    }
];