import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js'
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {

  public kc: KeycloakInstance;
  constructor(private tokenStorageService: TokenStorageService, private authservice: AuthService) { }


  public async init() {
    console.log("security initialiaation .....")
    this.kc = new Keycloak({
      url: "http://localhost:8090/auth/",
      realm: "Test-Realm",
      clientId: "rhis-front"

    });
    await this.kc.init({
      onLoad: 'login-required',

    })
    console.log(this.kc.tokenParsed['preferred_username']);
    this.authservice.getPrivileges(this.kc.tokenParsed['preferred_username']).subscribe(
      data => {
        console.log(data)

        const output = JSON.stringify(data)

        window.localStorage.removeItem("privileges")
        window.localStorage.setItem("privileges", output);
        window.localStorage.removeItem("token")
        window.localStorage.setItem("token", this.kc.token);


        console.log(JSON.parse(window.localStorage.getItem('privileges'))['ListProduct'])

      },
      err => {
        console.log(err)
      }
    )


  }

}
