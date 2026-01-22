import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PaintFormula} from "./model/paint-formula.model";
import {PaintBatch} from "./model/paint-batch.model";

@Injectable({ providedIn: 'root' })
export class PaintFormulaService {

  private baseUrl = 'http://localhost:8080/api/v1/paint-formula';

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
    return this.http.get<any>(`http://localhost:8080/api/v1/paint-batches/all-manufacture-details`);
  }

  getBatchDetails(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/v1/paint-batches/batchDetails/${id}`);
  }


}
