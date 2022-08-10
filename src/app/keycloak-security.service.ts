import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js'
import { TokenStorageService } from './token-storage.service';
declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {

  public kc: KeycloakInstance;
  constructor(private tokenStorageService: TokenStorageService) { }


  public async init() {
    console.log("security initialiaation .....")
    this.kc = new Keycloak({
      url: "http://localhost:8081/auth/",
      realm: "oauth2-realm",
      clientId: "oauth2-client1"

    });
    await this.kc.init({
      onLoad: 'login-required',

    })
    let userDetails = await this.kc.loadUserProfile();
    const tok = userDetails['attributes'].token
    //var obj = JSON.parse(tok);

    console.log(this.kc.tokenParsed);

    //console.log(obj['jwt'])
    //this.tokenStorageService.saveToken(obj['jwt'])
  }

}
