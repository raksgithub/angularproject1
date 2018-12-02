import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { SearchItemsComponent } from './search-items/search-items.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ShoppingListRoutingModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    SearchItemsComponent, 
    FilterPipe
  ]
})
export class ShoppingListModule { }
