import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLE = 'auth-role'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  jwtHelper: any
  username: any
  decodedToken: any
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
    window.location.reload();

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
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, decodedToken.Roles)
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
  public getRole(): any {
    const role = window.sessionStorage.getItem(USER_ROLE);
    if (role) {
      return role
    }
    return {};
  }
}
