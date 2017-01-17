import {Component, OnInit} from '@angular/core';
import {UIRouter, Transition} from "ui-router-ng2";
import {Restangular} from "ng2-restangular";
import * as _ from "lodash";
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app',
    template: '<ui-view></ui-view>'
})
export class AppComponent implements OnInit {

    constructor(private router: UIRouter,
                private restangular: Restangular,
                private auth: AuthService) {

        // check for authenticate
        router.transitionService.onBefore(
            {
                to: (state) => !!_.get(state, 'data.access')
            },
            (transition: Transition) => {
                switch (_.get(transition.to(), 'data.access')) {
                    case '@':
                        if (!auth.isAuthenticated()) {
                            console.log('require authentication');
                            return router.stateService.target('login');
                        }
                        break;

                    case '?':
                        if (auth.isAuthenticated()) {
                            console.log('require guest');
                            return router.stateService.target('home');
                        }
                        break;
                }
            }
        );

        restangular.withConfig((RestangularConfigurer) => {
            RestangularConfigurer.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
                return {
                    params: params,
                    headers: Object.assign(
                        {},
                        headers,
                        auth.isAuthenticated() ? {'Authorization': 'Bearer ' + auth.getToken()} : {}
                    ),
                    element: element
                };
            });

            RestangularConfigurer.addErrorInterceptor((response, subject, responseHandler) => {
                console.log(response);
                switch (response.status) {
                    case 401:
                        auth.logout();
                        router.stateService.go('login');
                        // $rootScope.$broadcast('authUnauthorized');
                        break;

                    case 403:
                        router.stateService.go('home');
                        // $rootScope.$broadcast('authForbidden');
                        break;
                    default:
                        // this.toaster.pop('error', response.status, 'Server error');
                        break;

                }
            });
        });
    }

    ngOnInit(): void {
    }

}