import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';
import { Producto } from 'src/app/model/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  categoriesList: Categoria[] = [];
  private categoriesSubs = new Subscription;
  newProductForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    cost: new FormControl('', [Validators.min(0.1)]),
    unitsPerPackage: new FormControl('', [Validators.min(1)]),
    category: new FormControl('',[Validators.required])
  });

  constructor(private categoryService: CategoriaService,
              private productService: ProductoService,
              private dialog: MatDialog) { }
              
  ngOnInit(): void {
    this.categoriesSubs = this.categoryService.findAll().subscribe(
      data => {
        this.categoriesList = data;
      }
    );
  }

  async onSubmit(event: Event){
    if (this.newProductForm.invalid){
      this.newProductForm.markAsTouched();
      event.preventDefault();
    }
    else{
      const productName = this.newProductForm.controls.name.value!;
      let nombreFormateado = productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
      nombreFormateado = nombreFormateado.trim();
      const newProduct = new Producto(
          productName,
          parseFloat(this.newProductForm.controls.price.value!),
          this.newProductForm.controls.category.value!,
          this.newProductForm.controls.cost.value ? parseFloat(this.newProductForm.controls.cost.value!) : undefined,
          this.newProductForm.controls.unitsPerPackage.value ? parseInt(this.newProductForm.controls.unitsPerPackage.value!) : undefined,
        );
      await this.productService.save(newProduct).then(
        () => {
          this.dialog.closeAll();
          Swal.fire({
            title: 'Guardado!',
            text: 'El producto se guardo exitosamente.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'Ok'
          })
        },
        () => {
          this.dialog.closeAll();
          Swal.fire({
            title: 'Oops...',
            text: 'Algo salió mal.',
            icon: 'error',
          })
        }
      );
      
    }
  }

  ngOnDestroy(): void {
    this.categoriesSubs.unsubscribe();
  }
}
