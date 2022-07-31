import { Component, OnInit } from '@angular/core';
import { PrevilegeService } from '../previlege.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = "";


  constructor(private tokenStorage: TokenStorageService,private previlege: PrevilegeService) { }

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

  public onOpenModal( mode: string): void {

    const container = document.getElementById('navbarSupportedContent');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'error') {
      if (!this.previlege.canRead(this.tokenStorage.getListUser())){
      button.setAttribute('data-target', '#errorModal')
      container?.appendChild(button);
      button.click();
      }
    }
    
    
    //console.log(this.deleteUser?.firstName)
  }

}
