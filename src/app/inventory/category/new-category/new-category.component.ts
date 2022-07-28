import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private categoryService: CategoriaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.nameFormControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    return this.nameFormControl.hasError('minlength') ? 'Minimo 3 caracteres' : '';
  }

  async onSubmit(event: Event, name: string){
    if (this.nameFormControl.invalid){
      this.nameFormControl.markAsTouched();
      event.preventDefault();
    }
    else{
      const formatedName = (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).trim();
      const newCategory = new Categoria("8",formatedName);
      await this.categoryService.save(newCategory).then(
        () => {
          this.dialog.closeAll();
          Swal.fire({
            title: 'Guardado!',
            text: 'La categoría se guardo exitosamente.',
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
