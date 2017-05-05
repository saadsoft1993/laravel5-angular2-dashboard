import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../core/services/api.service';
import {Http} from '@angular/http';
import {RegisterUser} from '../register/register-user.model';

@Injectable()
export class RegisterService extends ApiService {
    protected readonly url:string = 'register';

    constructor(http: Http) {
        super(http);
    }

    public register(user: RegisterUser): Observable<any> {
        return this.http
            .post(this.url, user)
            .map(this.map);
    }
}
