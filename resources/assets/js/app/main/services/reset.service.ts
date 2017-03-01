import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable} from 'rxjs';
import {StateService} from 'ui-router-ng2';

@Injectable()
export class ResetService {
    constructor(private restangular: Restangular, private state: StateService) {
    }

    public reset(email: string): Observable<any> {
        return this.all()
            .post({email: email})
            .map(response => response.body ? response.json() : true)
            .catch(error => Observable.throw(error.json()));
    }

    public resetConfirmed(token: string, password: string, password_confirmation: string): Observable<any> {
        return this.allConfirmed()
            .post({token: token, password: password, password_confirmation: password_confirmation})
            .map(response => response.body ? response.json() : true)
            .catch(error => {
                if (error.status == 404) {
                    this.state.go('reset');
                }
                return Observable.throw(error.json())
            });
    }

    private all() {
        return this.restangular.all('reset');
    }

    private allConfirmed() {
        return this.restangular.all('reset-confirmed');
    }
}