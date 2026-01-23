import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaintFormula } from './model/paint-formula.model';
import { environment } from '../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class PaintFormulaService {
  private baseUrl = environment.apiUrl;

  private readonly API_URL = `${this.baseUrl}/api/v1/paint-formula`;

  constructor(private http: HttpClient) {}

  create(formula: PaintFormula): Observable<any> {
    return this.http.post(this.API_URL, formula);
  }
}
