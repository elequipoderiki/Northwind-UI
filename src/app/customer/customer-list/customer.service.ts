import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { 

  }

  getCustomerList(page: number, rows: number): Observable<Customer[]>{
    //using the Customer interface to specify the required properties,
    //belonging to Customer type, on the response.
    //this due to the response cannot be automatically converted to 
    //an instance of a class (Customer needed)
    return this.http.get<Customer[]> (`${environment.urlService}/customer/GetPaginatedCustomer/${page}/${rows}`);
  }
}
