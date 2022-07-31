import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = "";


  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.getUser()
    this.isadmin();
    this.isLoggesIn();
  }
  logout() {
    this.tokenStorage.signOut()
    window.location.reload()
    this.router.navigate(['/']);


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
