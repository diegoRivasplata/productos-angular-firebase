import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  nameFormControl: FormControl;

  constructor(private categoryService: CategoriaService,
              @Inject(MAT_DIALOG_DATA) public data: Categoria,
              private dialog: MatDialog) { 
    
    this.nameFormControl = new FormControl(this.data.nombre, [Validators.required, Validators.minLength(3)]);
  }

  ngOnInit(): void {

  }

  getErrorMessage() {
    if (this.nameFormControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    return this.nameFormControl.hasError('minlength') ? 'Minimo 3 caracteres' : '';
  }

  async onUpdateCategory(event: Event, name: string){
    if (this.nameFormControl.invalid){
      this.nameFormControl.markAsTouched();
      event.preventDefault();
    }
    else{
      let nombreFormateado = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      nombreFormateado = nombreFormateado.trim();
      this.data.nombre = nombreFormateado
      await this.categoryService.update(this.data).then(
        () => {
          this.dialog.closeAll();
          Swal.fire({
            title: '¡Editado!',
            text: 'La categoría se editó exitosamente.',
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
