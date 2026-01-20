import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RawMaterialStockViewModel} from "./model/raw-material-stock-view.model";
import {RawMaterialPurchaseResponse} from "./model/raw-material-purchase.model";
import {RawMaterialPurchaseRequest} from "./model/rawmaterial-add-purchase.model";
import {DashboardKpi} from "./model/dashboard-kpi.model";

@Injectable({
  providedIn: 'root'
})
export class RawMaterialInventoryService {

  private readonly BASE_URL = 'http://localhost:8080/api/v1/raw-material-inventory';

  constructor(private http: HttpClient) {}

  getStockView(): Observable<RawMaterialStockViewModel[]> {
    return this.http.get<RawMaterialStockViewModel[]>(
      `${this.BASE_URL}/show-quantity`
    );
  }
  addPurchase(request: RawMaterialPurchaseRequest): Observable<RawMaterialPurchaseResponse> {
    return this.http.post<RawMaterialPurchaseResponse>(`${this.BASE_URL}/purchase`, request);
  }

  getPurchaseHistory(materialName: string): Observable<RawMaterialPurchaseResponse[]> {
    return this.http.get<RawMaterialPurchaseResponse[]>(`${this.BASE_URL}/view-purchase/${encodeURIComponent(materialName)}`);
  }

  getAllPurchaseHistory(): Observable<RawMaterialPurchaseResponse[]> {
    return this.http.get<RawMaterialPurchaseResponse[]>(`${this.BASE_URL}/view-purchase`);
  }

  updatePurchase(id: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/update-purchase/${id}`,
      payload
    );
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}/delete-purchase/${id}`
    );
  }

  getKpis(): Observable<DashboardKpi> {
    return this.http.get<DashboardKpi>(`${this.BASE_URL}/kpis`);
  }

}
