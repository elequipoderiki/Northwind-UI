import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from './models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplierList(page:number, rows: number, searchTerm: string =''): Observable<Supplier[]>{
    return this.http.post<Supplier[]>(`${environment.urlService}/supplier/GetPaginatedSupplier`, {page: page,rows:rows,searchTerm: searchTerm});
  }
}
