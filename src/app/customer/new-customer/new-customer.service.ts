import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';

@Injectable({
  providedIn: 'root'
})
export class NewCustomerService {

  constructor(private http: HttpClient) { }

  saveCustomer(data: AddOrEditCustomer): Observable<Response>{
    data.id = undefined;
    return this.http.post(`${environment.urlService}/customer`, data)
    .pipe(
      map((response: any) => response));
  }
}
