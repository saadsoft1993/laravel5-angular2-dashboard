import {Injectable} from '@angular/core';
import {Restangular} from "../modules/ng2-restangular";
import {Observable} from "rxjs";
import {UIRouter, Transition} from "ui-router-ng2";
import * as _ from "lodash";

@Injectable()
export class AuthService {

    public storageKey = 'token';

    constructor(private router: UIRouter, private restangular: Restangular) {
        // check for authenticate
        router.transitionService.onBefore(
            {
                to: (state) => !!_.get(state, 'data.access')
            },
            (transition: Transition) => {
                switch (_.get(transition.to(), 'data.access')) {
                    case '@':
                        if (!this.isAuthenticated()) {
                            console.log('require authentication');
                            return router.stateService.target('login');
                        }
                        break;

                    case '?':
                        if (this.isAuthenticated()) {
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
                        this.isAuthenticated() ? {'Authorization': 'Bearer ' + this.getToken()} : {}
                    ),
                    element: element
                };
            });

            RestangularConfigurer.addErrorInterceptor((response, subject, responseHandler) => {
                console.log(response);
                switch (response.status) {
                    case 401:
                        this.logout();
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

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }

    public getToken(): string {
        return localStorage.getItem(this.storageKey);
    }

    public setToken(token: string): void {
        localStorage.setItem(this.storageKey, token);
    }

    public login(username: string, password: string): Observable<boolean> {

        return this.all()
            .post({username: username, password: password})
            .map((response) => {
                let token = response.json() && response.json().token;

                if (!token) {
                    return false;
                }

                this.setToken(token);

                return true;
            })
    }

    public logout(): void {
        localStorage.removeItem(this.storageKey);
    }

    private all() {
        return this.restangular.all('auth');
    }
}