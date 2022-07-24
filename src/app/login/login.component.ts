import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  username: String = ""
  decodedToken: any;
  jwtHelper: any
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser()
      this.roles = this.tokenStorage.getUser().Roles;
    }
  }
  onSubmit(): void {

    this.authService.login(this.form.value).subscribe(
      data => {
        console.log("DATA://", data["jwt"])
        this.tokenStorage.saveToken(data["jwt"])

        this.decodedToken = this.tokenStorage.getToken()
        this.jwtHelper = new JwtHelperService();
        this.decodedToken = this.jwtHelper.decodeToken(this.decodedToken)
        this.tokenStorage.saveUser(this.decodedToken)
        console.log("decoded token", this.decodedToken, "end")
        //console.log("Get User res:///",this.tokenStorage.getUser())
        //console.log("Get Role res:///",this.tokenStorage.getRole())

        //console.log("getToken Result",this.decodedToken)

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.roles = this.tokenStorage.getUser().roles;
        this.username = this.tokenStorage.getUser()

        window.location.reload()

        //this.jwtHelper = new JwtHelperService();
        //this.decodedToken = this.jwtHelper.decodeToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBaGR5S0VGSUB0ZWstdXAuZGUiLCJleHAiOjE2NTAyMzY1MjAsImlhdCI6MTY1MDIwMDUyMH0.ZZehsbTPyHAps0zPf_6MKoT7xc3UTpkWIhG-DLD4YPY")
        //console.log("DeCOdedTOKEn:::", this.decodedToken.sub)
        //console.log("USER:///", this.username)
        this.goHome();
      },

      err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  goHome(): void {
    this.router.navigate(['/home']);
  }

}
