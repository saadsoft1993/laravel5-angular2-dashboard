import {Injectable} from '@angular/core';
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

    public storageKey = 'token';

    constructor(private restangular: Restangular) {

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