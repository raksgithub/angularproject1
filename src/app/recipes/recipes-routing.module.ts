import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeNewComponent } from './recipe-new/recipe-new.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  { 
    // for /recipes
    path: 'recipes', 
    component: RecipesComponent, 
    children: [
    { 
      // for /recipes/'' => /recipes
      path: '', 
      component: RecipeListComponent, 
      // 3 Child routes 
      children: [
      {
        // for /recipes/''/new  => /recipes/new
        path: 'new',
        component: RecipeNewComponent
      },
      { 
        // for /recipes/''/id => /recipe/id
        path: ':id', 
        component: RecipeDetailComponent 
      }, 
      {
        // for /recipes/''/id/edit => /recipes/id/edit
        path: ':id/edit',
        component: RecipeEditComponent
      }] 
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
