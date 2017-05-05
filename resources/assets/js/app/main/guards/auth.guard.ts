import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private login: LoginService, private auth: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            return true;
        }
        this.login.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    }
}
