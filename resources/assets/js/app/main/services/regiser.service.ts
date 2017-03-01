import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable} from 'rxjs';

@Injectable()
export class RegisterService {
    constructor(private restangular: Restangular) {
    }

    public register(name: string, email: string, password: string, password_confirmation: string):Observable<any> {
        return this.all()
            .post({name: name, email: email, password: password, password_confirmation: password_confirmation})
            .map(response => response.body ? response.json() : true)
            .catch(error => Observable.throw(error.json()));
    }

    private all() {
        return this.restangular.all('register');
    }
}
