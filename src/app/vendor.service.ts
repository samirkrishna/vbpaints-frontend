import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vendor} from "./model/vendor.model";
import {SupplierTransactionRequest} from "./model/supplier-transacation-request.model";

@Injectable({ providedIn: 'root' })
export class VendorService {

  private BASE_URL = 'http://localhost:8080/api/v1/vendors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.BASE_URL);
  }

  create(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.BASE_URL, vendor);
  }

  update(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.BASE_URL}/${id}`, vendor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  createSupplier(payload: SupplierTransactionRequest ): Observable<SupplierTransactionRequest>{
    return this.http.post<SupplierTransactionRequest>('http://localhost:8080/api/v1/supplier-transactions',payload)
  }
}
