import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { NewCategoryComponent } from './category/new-category/new-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule	 } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    CategoryComponent,
    NewCategoryComponent,
    UpdateCategoryComponent,
    ProductComponent,
    NewProductComponent,
    UpdateProductComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ]
})
export class InventoryModule { }
