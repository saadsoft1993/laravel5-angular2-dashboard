import {ApiService} from '../../core/services/api.service';
import {EventEmitter, Injectable} from '@angular/core';
import {ServiceException} from '../../core/exception/service.exception';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';
@Injectable()
export class LoginService extends ApiService {

    protected readonly url = 'auth';
    public redirectUrl = '';

    constructor(http: Http, private router: Router, private auth:AuthService) {
        super(http);
    }

    public login(email: string, password: string): Observable<any> {
        return this.http.post(this.url, {email: email, password: password})
            .map(response => {
                let data: any = response.json();
                let token = data.token;
                if (!token) {
                    throw new ServiceException('Invalid token');
                }
                this.auth.setToken(token);
                this.router.navigate([this.redirectUrl]);
                return response;
            })
            .catch(error => Observable.throw(error.json()));
    }
}