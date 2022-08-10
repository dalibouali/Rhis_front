import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const SCREEN1 = 'ListProduct';
const SCREEN2 = 'ListUser';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  jwtHelper: any
  username: any
  decodedToken: any
  constructor(private router: Router) { }
  signOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['/login'])

  }
  public saveToken(token: string): void {

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token)
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(decodedToken: any): void {

    window.sessionStorage.removeItem(USER_KEY);


    window.sessionStorage.setItem(USER_KEY, decodedToken.sub)
    console.log("user role:::", decodedToken)
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user
    }
    return {};
  }
  public getListProduct(): any {
    this.decodedToken = this.getToken()
    this.jwtHelper = new JwtHelperService();
    this.decodedToken = this.jwtHelper.decodeToken(this.decodedToken)
    const role = this.decodedToken.ListProduct;
    if (role) {
      return role
    }
    return {};
  }
  public getListUser(): any {
    this.decodedToken = this.getToken()
    this.jwtHelper = new JwtHelperService();
    this.decodedToken = this.jwtHelper.decodeToken(this.decodedToken)
    const role = this.decodedToken.ListUser;
    if (role) {
      return role
    }
    return {};
  }
}
