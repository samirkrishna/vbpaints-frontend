import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaintFormula } from './model/paint-formula.model';

@Injectable({ providedIn: 'root' })
export class PaintFormulaService {

  private readonly API_URL = 'http://localhost:8080/api/v1/paint-formula';

  constructor(private http: HttpClient) {}

  create(formula: PaintFormula): Observable<any> {
    return this.http.post(this.API_URL, formula);
  }
}
