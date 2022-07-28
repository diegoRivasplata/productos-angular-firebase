import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NewCategoryComponent } from './new-category/new-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isDataLoading = true;
  dataSource = new MatTableDataSource<Categoria>;
  displayedColumns: string[] = ['nombre','actions'];
  private categoriesSubs = new Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoriaService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categoriesSubs = this.categoryService.findAll().subscribe({
      next: data => {
        this.isDataLoading = false;
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        })
      },
      error: () => this.isDataLoading = false
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openNewCategoryDialog(){
    this.dialog.open(NewCategoryComponent);
  }

  openUpdateCategoryDialog(categoria: Categoria){
    this.dialog.open(UpdateCategoryComponent,{
      data: {
        id: categoria.id,
        nombre: categoria.nombre
      }
    });
  }

  deleteCategory(id: string){
    Swal.fire({
      title: '¿Está seguro?',
      text: 'La categoría sera eliminada permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then(async result => {
      if(result.isConfirmed){
        await this.categoryService.delete(id);
        Swal.fire(
          'Eliminado!',
          'La categoría fue eliminada.',
          'success'
        )
      }
    });
  }

  ngOnDestroy(): void {
    this.categoriesSubs.unsubscribe();
  }
}
