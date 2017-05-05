import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';
import {ApiService} from '../../core/services/api.service';
import {Router} from '@angular/router';

@Injectable()
export class ResetService extends ApiService {

    protected readonly url: string = 'reset';

    constructor(http: Http, protected router: Router) {
        super(http);
    }

    public reset(email: string): Observable<any> {
        return this.http
            .post(this.url, {email: email})
            .map(this.map);
    }

    public resetConfirmed(token: string, password: string, password_confirmation: string): Observable<any> {
        return this.http
            .post('reset-confirmed', {token: token, password: password, password_confirmation: password_confirmation})
            .map(this.map)
            .catch(error => {
                if (error.status == 404) {
                    this.router.navigate(['reset']);
                }
                return Observable.throw(error)
            });
    }
}