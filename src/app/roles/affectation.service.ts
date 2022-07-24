import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Affectation } from './Affectation';
@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private apiServerUrl=environment.HoussemapiBaseUrl;


  constructor(private http:HttpClient) { }

  public getAffectations():Observable<Affectation[]>{
    return this.http.get<Affectation[]>(`${this.apiServerUrl}/retireve-all-affectation`);
  }

  public addAffectation(affectation:Affectation,role_id:number,user_id:number):Observable<Affectation>{
    return this.http.post<Affectation>(`${this.apiServerUrl}/add-affectation/${role_id}/${user_id}`,affectation);
  }
  public updateAffectation(affectation:Affectation,role_id:number,user_id:number):Observable<Affectation>{
    return this.http.put<Affectation>(`${this.apiServerUrl}/modify-affectation/{role_id}/{user_id}`,affectation);
  }
  public deleteAffectation(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete-affectation/${id}`);
  }
}
