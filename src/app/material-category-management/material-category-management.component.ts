import { Component, OnInit } from '@angular/core';
import { MaterialCategory } from '../model/material-category.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialCategoryService } from '../material-service.service';

@Component({
  selector: 'app-material-category-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material-category-management.component.html',
  styleUrl: './material-category-management.component.css'
})
export class MaterialCategoryManagementComponent implements OnInit {

  categories: MaterialCategory[] = [];
  newCategory = '';
  editCategory: MaterialCategory | null = null;

  constructor(private service: MaterialCategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.categories = data);
  }

  add() {
    if(!this.newCategory) return;

    this.service.create({name:this.newCategory})
      .subscribe(()=>{
        this.newCategory='';
        this.load();
      });
  }

  edit(cat: MaterialCategory) {
    this.editCategory = {...cat};
  }

  update() {
    if(!this.editCategory) return;

    this.service.update(this.editCategory.id!, this.editCategory)
      .subscribe(()=>{
        this.editCategory = null;
        this.load();
      });
  }

  delete(id:number){
    this.service.delete(id)
      .subscribe(()=> this.load());
  }
}