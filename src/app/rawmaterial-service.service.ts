import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawMaterial } from './model/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  private readonly API_URL = 'http://localhost:8080/api/v1/raw-materials';

  constructor(private http: HttpClient) {}

  createRawMaterial(data: RawMaterial): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  getRawMaterialNames(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.API_URL}`);
  }

  update(id: number, payload: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
