import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ManufactureBatchService {

  private baseUrl = environment.apiUrl;

  private batchUrl = `${this.baseUrl}/api/v1/paint-batches`;
  private formulaUrl = `${this.baseUrl}/api/v1/paint-formula`;
  private containerUrl = `${this.baseUrl}/api/v1/container-inventory`;
  

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

    // =========================================
  // 🔹 GET SINGLE BATCH (EDIT)
  // =========================================
  getBatchDetails(id: number): Observable<any> {
    return this.http.get(
      `${this.batchUrl}/batchDetails/${id}`
    );
  }

   // =========================================
  // 🔹 UPDATE BATCH (EDIT SAVE)
  // =========================================
  updateBatch(id: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.batchUrl}/update/${id}`,
      payload
    );
  }

  getInventory() {
     return this.http.get<any[]>(`${this.batchUrl}/inventory/paint`);
    }

    getContainers() {
      console.log('Fetching container inventory...');
      return this.http.get<any[]>(`${this.containerUrl}/all`);
    }

    updateContainer(container: any) {
      return this.http.post(
        `${this.containerUrl}/update`,
        container
      );
    }

    addContainer(data: any) {
      return this.http.post(`${this.containerUrl}`, data);
    }

    deleteContainer(size: number) {
      return this.http.delete(`${this.containerUrl}/containers/${size}`);
    }
}
