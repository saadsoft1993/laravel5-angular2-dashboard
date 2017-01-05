import {Injectable} from '@angular/core';
import {Restangular} from "../modules/ng2-restangular";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

    public token: string;
    public storageKey = 'token';

    constructor(private restangular: Restangular) {
    }

    public login(username: string, password: string): Observable<boolean> {

        return this.all()
            .post({username: username, password: password})
            .map((response) => {
                let token = response.json() && response.json().token;

                if (!token) {
                    return false;
                }

                this.token = token;
                localStorage.setItem(this.storageKey, token);

                return true;
            })
    }

    public logout(): void {
        localStorage.removeItem(this.storageKey)
    }

    private all() {
        return this.restangular.all('auth')
    }
}