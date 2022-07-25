import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ecran } from './Ecran';
@Injectable({
  providedIn: 'root'
})
export class EcranService {


  private apiServerUrl=environment.HoussemapiBaseUrl;


  constructor(private http:HttpClient) { }

  public getEcrans():Observable<Ecran[]>{
    //let headers_ = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8081/api");
    return this.http.get<Ecran[]>(`${this.apiServerUrl}/get-all-ecran`);
  }
  public addEcran(ecran:Ecran):Observable<Ecran>{
    return this.http.post<Ecran>(`${this.apiServerUrl}/add-ecran`,ecran);
  }
  public updateEcran(ecran:Ecran):Observable<Ecran>{
    return this.http.put<Ecran>(`${this.apiServerUrl}/modify-ecran`,ecran);
  }
  public deleteEcran(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/delete-ecran/${id}`);
  }
  public getEcran(id:number){
    return this.http.get(`${this.apiServerUrl}/retrieve-ecran/${id}`)
  }
  public getEcranName(name:string):Observable<Ecran>{
    return this.http.get<Ecran>(`${this.apiServerUrl}/get-ecran/${name}`)
  }
}
