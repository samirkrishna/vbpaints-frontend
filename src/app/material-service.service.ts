import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialCategory } from './model/material-category.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MaterialCategoryService {

  private baseUrl:string = environment.apiUrl;

  private api = `${this.baseUrl}/api/material-categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MaterialCategory[]> {
    return this.http.get<MaterialCategory[]>(this.api);
  }

  create(category: MaterialCategory) {
    return this.http.post(this.api, category);
  }

  update(id: number, category: MaterialCategory) {
    return this.http.put(`${this.api}/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}