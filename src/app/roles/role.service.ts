import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './Role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiServerUrl=environment.HoussemapiBaseUrl;


  constructor(private http:HttpClient) { }
  public getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiServerUrl}/retrieve-all-roles`);
  }
  public addRole(role:Role):Observable<Role>{
    return this.http.post<Role>(`${this.apiServerUrl}/add-role`,role);
  }
  public updateRole(role:Role):Observable<Role>{
    return this.http.put<Role>(`${this.apiServerUrl}/modify-role`,role);
  }
  public deleteRole(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete-role/${id}`);
  }
  public getRole(name:string):Observable<Role>{
    return this.http.get<Role>(`${this.apiServerUrl}/retrieve-role/${name}`);
  }

}
