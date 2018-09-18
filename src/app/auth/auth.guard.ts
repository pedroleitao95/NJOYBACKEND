import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.authStatus;

    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
