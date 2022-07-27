import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = "";


  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getUser()
    this.isadmin();
  }
  logout() {
    this.tokenStorage.signOut()
    window.location.reload()

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
    if (this.tokenStorage.getUser) {
      this.username = this.tokenStorage.getUser()
      let cred = [this.username]
      return cred;
    }
    else {

      return null
    };
  }

}
