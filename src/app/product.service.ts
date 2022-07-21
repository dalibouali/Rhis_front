import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {

    return this.http.get('http://localhost:8085/api/products');
  }
  deleteFProduct(name: string): Observable<any> {

    return this.http.delete('http://localhost:8085/api/deleteproduct/' + name);

  }
  updateProduct(name: string, form: any): Observable<any> {

    return this.http.put('http://localhost:8085/api/updateproduct/' + name, form);

  }
  addProduct(form: any): Observable<any> {

    return this.http.post('http://localhost:8085/api/addproduct', form);

  }
}
