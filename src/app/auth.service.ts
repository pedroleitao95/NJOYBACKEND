import { environment } from './../environments/environment';
import { Subject } from 'rxjs';
import { AuthData } from './auth/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  get _token(): string {
    return this.token;
  }

  get _authStatusListener() {
    return this.authStatusListener.asObservable();
  }
  get authStatus() {
    return this.isAuthenticated;
  }
  get userID() {
    return this.userId;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(BACKEND_URL + 'signup', authData)
    .subscribe( response => {
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false);
    });


  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfomation = this.getAuthData();
    if (!authInfomation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfomation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInfomation.token;
      this.isAuthenticated = true;
      this.userId = authInfomation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate || !userId) {
        return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };

  }

}
