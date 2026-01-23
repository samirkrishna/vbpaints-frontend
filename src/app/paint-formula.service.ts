import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PaintFormula} from "./model/paint-formula.model";
import {PaintBatch} from "./model/paint-batch.model";
import { environment } from '../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class PaintFormulaService {
  private apiUrl = environment.apiUrl;
  
  private baseUrl = `${this.apiUrl}/api/v1/paint-formula`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaintFormula[]> {
    return this.http.get<PaintFormula[]>(this.baseUrl);
  }

  update(id: number, active: boolean): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${id}`,
      null,
      { params: { active } }
    );
  }

  getManufacturedBatches(): Observable<PaintBatch[]> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/paint-batches/all-manufacture-details`);
  }

  getBatchDetails(id: number) {
    return this.http.get<any>(`${this.apiUrl}/api/v1/paint-batches/batchDetails/${id}`);
  }


}
