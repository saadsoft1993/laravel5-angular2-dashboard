import {Injectable, EventEmitter} from '@angular/core';
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";

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

    public login(email: string, password: string): Observable<boolean> {
        return this.all()
            .post({email: email, password: password})
            .map((response) => {
                let token = response.json() && response.json().token;

                if (!token) {
                    return false;
                }

                this.setToken(token);

                return true;
            });
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