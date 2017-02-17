import {Component, OnInit} from '@angular/core';
import {UIRouter, Transition, TargetState} from 'ui-router-ng2';
import {Restangular} from 'ng2-restangular';
import * as _ from 'lodash';
import {AuthService} from './services/auth.service';
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app',
    template: '<ui-view></ui-view>'
})
export class AppComponent implements OnInit {

    private loginStateName = 'login';
    private homeStateName = 'home';
    private defaultHeaders = {};
    private stateDataAccess = 'data.access';

    constructor(private router: UIRouter,
                private restangular: Restangular,
                private toaster: ToasterService,
                private auth: AuthService) {
    }

    public ngOnInit(): void {
        // check for authenticate
        this.router.transitionService.onBefore(
            {
                to: (state) => !!_.get(state, this.stateDataAccess)
            },
            (transition: Transition) => {
                return this.routerTransition(transition);
            }
        );

        // restangular config
        this.restangular.withConfig((RestangularConfigurer) => {
            this.restangularConfig(RestangularConfigurer);
        });

        // unauthorized subscribe
        this.auth.authUnauthorized$.subscribe(() => {
            this.onAuthUnauthorized();
        });

        // forbidden subscribe
        this.auth.authForbidden$.subscribe(() => {
            this.onAuthForbidden();
        });
    }

    public onAuthUnauthorized(): void {
        this.router.stateService.go(this.loginStateName);
    }

    public onAuthForbidden(): void {
        this.router.stateService.go(this.homeStateName);
    }

    public restangularConfig(RestangularConfigurer): void {
        RestangularConfigurer.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
            return {
                params: params,
                headers: Object.assign(
                    this.defaultHeaders,
                    headers,
                    this.auth.isAuthenticated() ? {'Authorization': 'Bearer ' + this.auth.getToken()} : {}
                ),
                element: element
            };
        });

        RestangularConfigurer.setErrorInterceptor((response, subject, responseHandler) => {
            switch (response.status) {
                case 401:
                    this.auth.logout();
                    break;
                case 403:
                    this.auth.forbidden();
                    break;
                default:
                    if(/4\d{2}/.test(response.status) && response.status != '401' && response.status != '403') {
                        return true;
                    }
                    this.toaster.pop('error', response.status, 'Server error');
                    break;

            }
        });
    }

    public routerTransition(transition: Transition): TargetState {
        switch (_.get(transition.to(), this.stateDataAccess)) {
            case '@':
                if (!this.auth.isAuthenticated()) {
                    // console.log('require authentication');
                    return this.router.stateService.target(this.loginStateName);
                }
                break;

            case '?':
                if (this.auth.isAuthenticated()) {
                    // console.log('require guest');
                    return this.router.stateService.target(this.homeStateName);
                }
                break;
        }
    }

}