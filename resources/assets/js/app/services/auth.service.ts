import {Injectable, EventEmitter} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable} from 'rxjs';
import {ServiceException} from './../exception/service.exception';

@Injectable()
export class AuthService {

    public storageKey = 'token';
    public authUnauthorized$: EventEmitter<null>;
    public authForbidden$: EventEmitter<null>;

    constructor(private restangular: Restangular) {
        this.authUnauthorized$ = new EventEmitter();
        this.authForbidden$ = new EventEmitter();
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

    public login(email: string, password: string): Observable<any> {
        return this.all()
            .post({email: email, password: password})
            .map(response => {
                response = response.json();
                let token = response.token;
                if (!token) {
                    throw new ServiceException('Invalid token');
                }
                this.setToken(token);
                return response;
            })
            .catch(error => Observable.throw(error.json()));
    }

    public logout(): void {
        localStorage.removeItem(this.storageKey);
        this.authUnauthorized$.emit();
    }

    public forbidden(): void {
        this.authForbidden$.emit();
    }

    private all() {
        return this.restangular.all('auth');
    }
}