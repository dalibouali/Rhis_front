import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    //let headers_ = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8081/api");
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/register`, user);
  }
  public updateUser(user: User, username: string): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/updateuser/${username}`, user);
  }
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/delete/${username}`, { responseType: 'text' });
  }
  public getUser(username: string) {
    return this.http.get(`${this.apiServerUrl}/user/${username}`)
  }
}
