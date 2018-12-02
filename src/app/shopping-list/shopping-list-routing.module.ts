import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { SearchItemsComponent } from './search-items/search-items.component';

const routes: Routes = [
  { 
    path: 'shopping-list', 
    component: ShoppingListComponent 
  }, 
  {
    path: 'search-items',
    component: SearchItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
