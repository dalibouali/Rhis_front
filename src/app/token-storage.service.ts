import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    window.sessionStorage.removeItem(SCREEN1);
    window.sessionStorage.setItem(SCREEN1, decodedToken.ListProduct)
    window.sessionStorage.removeItem(SCREEN2);
    window.sessionStorage.setItem(SCREEN2, decodedToken.ListUser)
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
    const role = window.sessionStorage.getItem(SCREEN1);
    if (role) {
      return role
    }
    return {};
  }
  public getListUser(): any {
    const role = window.sessionStorage.getItem(SCREEN2);
    if (role) {
      return role
    }
    return {};
  }
}
