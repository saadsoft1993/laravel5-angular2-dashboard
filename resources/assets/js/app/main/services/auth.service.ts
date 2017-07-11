import {Injectable, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

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