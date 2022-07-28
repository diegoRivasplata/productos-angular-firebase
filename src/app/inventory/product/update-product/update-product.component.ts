import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';
import { Producto } from 'src/app/model/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  categoriesList: Categoria[] = [];
  categoriesSubs = new Subscription;
  newProductForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    cost: new FormControl(),
    unitsPerPackage: new FormControl(),
    category: new FormControl()
  });;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Producto,
              private productService: ProductoService,
              private categoryService: CategoriaService,
              private dialog: MatDialog) {
    this.newProductForm = new FormGroup({
      name: new FormControl(data.nombre, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(data.precioVenta, [Validators.required, Validators.min(0.1)]),
      cost: new FormControl(data.precioCompra, [Validators.min(0.1)]),
      unitsPerPackage: new FormControl(data.unidadesPorPaquete, [Validators.min(1)]),
      category: new FormControl(data.categoria,[Validators.required])
    });
  }

  ngOnInit(): void {
    this.categoriesSubs = this.categoryService.findAll().subscribe(
      data => this.categoriesList = data
    )
  }

  async onSubmit(event: Event){
    if (this.newProductForm.invalid){
      this.newProductForm.markAsTouched();
      event.preventDefault();
    }
    else{
      const controls = this.newProductForm.controls;
      let formatedName = controls.name.value.charAt(0).toUpperCase() + controls.name.value.slice(1).toLowerCase();
      formatedName = formatedName.trim();
      const updatedProduct = {
        ...this.data,
        nombre: formatedName,
        precioVenta: controls.price.value,
        categoria: controls.category.value,
        precioCompra: controls.cost.value,
        unidadesPorPaquete: controls.unitsPerPackage.value
      }
      await this.productService.update(updatedProduct).then(
        () => {
          this.dialog.closeAll();
          Swal.fire({
            title: '¡Editado!',
            text: 'El producto se editó exitosamente.',
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
}
