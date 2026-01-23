import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ManufactureBatchService {

  private baseUrl = environment.apiUrl;

  private batchUrl = `${this.baseUrl}/api/v1/paint-batches`;
  private formulaUrl = `${this.baseUrl}/api/v1/paint-formula`;
  

  constructor(private http: HttpClient) {}

    /** 🔹 Load paints dynamically */
  getPaintFormulas(): Observable<any[]> {
    return this.http.get<any[]>(this.formulaUrl);
  }

  validateMaterials(formulaId: number, batchSize: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.batchUrl}/validate-materials`,
      { params: { formulaId, batchSize } }
    );
  }

  manufacture(payload: any): Observable<any> {
    return this.http.post(
      `${this.batchUrl}/manufacture`,
      payload
    );
  }
}
