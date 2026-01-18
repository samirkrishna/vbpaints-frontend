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
}
