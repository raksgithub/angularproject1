import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../header/shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ SearchService ]
})
export class ShoppingListComponent implements OnInit{

  ingredients: Ingredient[];
  filteredIngredients: Ingredient[];
  searchingStarted: boolean = false;
  
  constructor(private shoppingListService: ShoppingListService, private searchService: SearchService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.filteredIngredients = this.searchService.getFilteredIngredients();
    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.filteredIngredients = ingredients;
      });
    this.shoppingListService.ingredientsCleared
      .subscribe(() => {
        this.ingredients = this.shoppingListService.getIngredients();
      });
    this.searchService.filteredIngredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.filteredIngredients = ingredients;
      });
  }

  deleteItem(id: number) {
    this.shoppingListService.deleteIngredientFromShoppingList(id);
  }

  onToggled(search: boolean) {
    this.searchingStarted = search;
  }

}
