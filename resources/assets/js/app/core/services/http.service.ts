import {Injectable} from '@angular/core';
import {ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {AuthService} from '../../main/services/auth.service';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from './error-handler.service';

@Injectable()
export class HttpService extends Http {

    readonly urlPrefix = 'api/v1/';

    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private errorHandler: ErrorHandlerService, private auth: AuthService) {
        super(_backend, _defaultOptions);
        this.setHeaders();
        this.auth.authUnauthorized$.merge(this.auth.authenticated$).subscribe(() => {
            this.setHeaders();
        })
    }

    private setHeaders() {
        if (this.auth.isAuthenticated()) {
            this._defaultOptions.headers.set('Authorization', `Bearer ${this.auth.getToken()}`);
        } else {
            this._defaultOptions.headers.delete('Authorization');
        }
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (url instanceof Request) {
            url.url = this.urlPrefix + url.url;
        } else {
            url = this.urlPrefix + url;
        }

        return super.request(url, options).catch((res: Response) => {
            switch (res.status) {
                case 401:
                    this.auth.logout();
                    break;
                case 403:
                    this.auth.forbidden();
                    break;
                default:
                    if (res.status >= 500 || res.status < 400) {
                        this.errorHandler.handle(String(res.status), 'Server error');
                    }
                    break;
            }
            return Observable.throw(res.text() ? res.json() : {});
        })
    }

}
