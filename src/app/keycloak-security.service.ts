import { Injectable } from '@angular/core';
import { KeycloakInstance, KeycloakLoginOptions } from 'keycloak-js'
import { AuthService } from './auth.service';

import * as CryptoJS from 'crypto-js';
import { Route, Router } from '@angular/router';

declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {

  public kc: KeycloakInstance;
  constructor(private authservice: AuthService, private router: Router) { }

  public async init() {
    console.log("security initialiaation .....")
    this.kc = new Keycloak({
      url: "http://localhost:8090/auth/",
      realm: "Test-Realm",
      clientId: "rhis-front"

    });
    await this.kc.init({
      onLoad: 'login-required',
      redirectUri: 'http://localhost:4200/home'

    })

    let userDetails = await this.kc.loadUserProfile();
    const tok = userDetails['attributes'].token
    //var obj = JSON.parse(tok);
    this.router.navigate['/home']
    console.log(this.kc.tokenParsed['preferred_username']);
    this.authservice.getPrivileges(this.kc.tokenParsed['preferred_username']).subscribe(
      data => {
        console.log(data)

        const output = JSON.stringify(data)
        const encrypt = CryptoJS.AES.encrypt(output, "RHIS").toString();


        window.localStorage.removeItem("privileges")
        window.localStorage.setItem("privileges", encrypt);
        window.localStorage.removeItem("token")
        window.localStorage.setItem("token", this.kc.token);




      },
      err => {
        console.log(err)
      }
    )



  }

}
