import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable} from 'rxjs';

@Injectable()
export class ResetService {
    constructor(private restangular:Restangular) {
    }

    public reset(email:string):Observable<any> {
        return this.all()
            .post({email: email})
            .map((response) => {
                return response.json();
            }).catch((error) => {
                return Observable.throw(error.json());
            });
    }

    public resetConfirmed(token:string, password:string, password_confirmation:string):Observable<any> {
        return this.allConfirmed()
            .post({token: token, password: password, password_confirmation: password_confirmation})
            .map((response) => {
                return response.json();
            })
            .catch((error) => {
                return Observable.throw(error.json());
            });
    }

    private all() {
        return this.restangular.all('reset');
    }

    private allConfirmed() {
        return this.restangular.all('reset-confirmed');
    }
}