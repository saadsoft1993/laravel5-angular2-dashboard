import {Injectable, EventEmitter, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceException} from '../../core/exception/service.exception';
import {Http} from '@angular/http';
import {ApiService} from '../../core/services/api.service';
import {Router} from '@angular/router';
import {PageService} from '../../core/services/page/page.service';
import {ToasterService} from 'angular2-toaster';
import {LoginService} from './login.service';

@Injectable()
export class AuthService {

    protected readonly url: string = 'auth';

    private token: string;

    public readonly storageKey = 'token';
    public readonly authUnauthorized$ = new EventEmitter<null>();
    public readonly authForbidden$ = new EventEmitter<null>();
    public readonly authenticated$ = new EventEmitter<null>();


    constructor(private router: Router) {
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }

    public getToken(): string {
        return this.token || (this.token = localStorage.getItem(this.storageKey));
    }

    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem(this.storageKey, token);
        this.authenticated$.emit();
    }

    public logout(): void {
        localStorage.removeItem(this.storageKey);
        this.token = null;
        this.authUnauthorized$.emit();
        this.router.navigate(['login']);
    }

    public forbidden(): void {
        this.authForbidden$.emit();
    }
}