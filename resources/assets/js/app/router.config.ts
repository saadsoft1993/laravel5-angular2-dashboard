import {Injectable} from '@angular/core';
import {UIRouter, Transition} from "ui-router-ng2";
import {AuthService} from "./services/auth.service";
import * as _ from "lodash";

@Injectable()
export class RouterConfig {

    constructor(private uiRouter: UIRouter, private auth: AuthService) {
        const requireAuthentication = (transition: Transition) => {
            console.log('require authentication');

            if (!this.auth.isAuthenticated()) {
                return uiRouter.stateService.go('login');
            }
        };

        const requireGuest = (transition: Transition) => {
            console.log('require guest');

            if (this.auth.isAuthenticated()) {
                return uiRouter.stateService.go('home');
            }
        };

        // check for authenticate
        uiRouter.transitionService.onBefore(
            {
                to: (state) => _.get(state,'data.access') == '@'
            },
            requireAuthentication
        );

        // check for guest
        uiRouter.transitionService.onBefore(
            {
                to: (state) => _.get(state,'data.access') == '?'
            },
            requireGuest
        );
    }
}