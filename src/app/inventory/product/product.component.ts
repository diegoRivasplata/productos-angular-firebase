import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';
import { Producto } from 'src/app/model/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { NewProductComponent } from './new-product/new-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductComponent implements OnInit {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();
  displayedColumns: string[] = ['nombre', 'precioVenta', 'categoria','actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedProduct!: Producto | null;
  categoriesList: Categoria[] = [];
  isDataLoading = true;
  private productSubs = new Subscription;
  private categorySubs = new Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductoService,
              private categoryService: CategoriaService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productSubs = this.productService.findAll().subscribe({
      next: data => {
        this.isDataLoading = false
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        })
        this.categorySubs = this.categoryService.findAll().subscribe(
          data => {
            this.categoriesList = data;
          }
        )
      },
      error: () => this.isDataLoading = false,
    }
      
    );
    this.paginator._intl.itemsPerPageLabel="Items por página"
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openNewProductDialog(){
    const dialogBoxSettings = {
      height: 'fit-content',
      width: '530px',
      margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
    };
    this.dialog.open(NewProductComponent,dialogBoxSettings);
  }

  openUpdateProductDialog(producto: Producto){
    const dialogBoxSettings = {
      height: 'fit-content',
      width: '530px',
      margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        id: producto.id,
        nombre: producto.nombre,
        precioVenta: producto.precioVenta,
        categoria: producto.categoria,
        precioCompra: producto.precioCompra,
        unidadesPorPaquete: producto.unidadesPorPaquete
      }
    }
    this.dialog.open(UpdateProductComponent, dialogBoxSettings);
  }

  deleteProduct(id: string){
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El producto sera eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then(async result => {
      if(result.isConfirmed){
        await this.productService.delete(id);
        Swal.fire(
          'Eliminado!',
          'El producto fue eliminado.',
          'success'
        )
      }
    });
  }

  getCategoryName(categoryId: string): string{

    const founded = this.categoriesList.find(cat => {
      return cat.id === categoryId 
    });
    return founded ? founded.nombre :'Not available';

  }

  ngOnDestroy(): void {
    this.productSubs.unsubscribe();
    this.categorySubs.unsubscribe();
  }
}
