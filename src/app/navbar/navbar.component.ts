import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';
import { PrevilegeService } from '../previlege.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  encryptPrev = window.localStorage.getItem('privileges');
  decrypt = CryptoJS.AES.decrypt(this.encryptPrev, "RHIS").toString(CryptoJS.enc.Utf8);

  Privileges = JSON.parse(this.decrypt)


  UserPrev = this.Privileges['ListUser'];
  username = "";


  constructor(private previlege: PrevilegeService, private router: Router, public securityservice: KeycloakSecurityService) { }

  ngOnInit(): void {
    this.getUser()
    this.isadmin();
    this.isLoggesIn();
  }
  logout() {




    window.location.reload()
    this.router.navigate(['/home']);
    this.securityservice.kc.logout();


  }
  isLoggedIn = false;
  isLoggesIn() {
    let u = this.getUser();

    if (u[0].length != null)
      this.isLoggedIn = true;
  }
  isAdmin = false;
  isadmin() {
    let u = this.getUser();
    if (u[0] == "admin@admin.com")
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  getUser() {
    if (this.securityservice.kc.tokenParsed['preferred_username']) {
      this.username = this.securityservice.kc.tokenParsed['preferred_username']
      let cred = [this.username]
      return cred;
    }
    else {

      return null
    };
  }

  public onOpenModal(mode: string): void {

    const container = document.getElementById('navbarSupportedContent');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'error') {
      if (!this.previlege.canRead(this.UserPrev)) {
        button.setAttribute('data-target', '#errorModal')
        container?.appendChild(button);
        button.click();
      }
    }


    //console.log(this.deleteUser?.firstName)
  }


}
