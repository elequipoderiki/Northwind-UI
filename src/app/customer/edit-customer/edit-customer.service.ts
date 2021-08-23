import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {
  //http injection avoids to add http code in edit-customer component 
  //then mantaining cohesion and robustness of the component
  constructor(private http: HttpClient) { }

  getCustomerById(int: number): Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlService}/customer/${int}`);
  }

  editCustomer(data: AddOrEditCustomer): Observable<Response>{
    return this.http.put(`${environment.urlService}/customer`,data)
    .pipe(
      map((response: any)=> response));
  }
}
