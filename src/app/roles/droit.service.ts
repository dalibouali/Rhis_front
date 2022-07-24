import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Droit } from './Droit';

@Injectable({
  providedIn: 'root'
})
export class DroitService {

  private apiServerUrl=environment.HoussemapiBaseUrl;


  constructor(private http:HttpClient) { }
  public getDroits():Observable<Droit[]>{
    return this.http.get<Droit[]>(`${this.apiServerUrl}//retrieve-all-droits`);
  }
  public addDroit(droit:Droit,role_id:number,ecran_id:number):Observable<Droit>{
    return this.http.post<Droit>(`${this.apiServerUrl}/add-droit/${role_id}/${ecran_id}`,droit);
  }
  public updateDroit(droit:Droit,role_id:number,ecran_id:number):Observable<Droit>{
    return this.http.put<Droit>(`${this.apiServerUrl}/modify-droit/${role_id}/${ecran_id}`,droit);
  }
  public deleteDroit(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete-droit/${id}`);
  }
  public getDroit(id:number):Observable<Droit>{
    return this.http.get<Droit>(`${this.apiServerUrl}/retrieve-droit/${id}`)
  }
}
