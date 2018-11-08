import { Ingredient, INGREDIENTS } from "../header/shared/ingredients.model";
import { Injectable, EventEmitter } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
@Injectable()
export class SearchService {

    filteredIngredientsChanged = new EventEmitter<Ingredient[]>();

    filteredIngredients: Ingredient[] = this.shoppingListService.getIngredients();;

    constructor(private shoppingListService: ShoppingListService) {}

    getFilteredIngredients(): Ingredient[]  {
        return this.filteredIngredients;
    }

    searchQuery(queryString: string) {
        let pattern = new RegExp("^" + queryString.toLocaleLowerCase());
        console.log(`Pattern: ${pattern.source}`);
        this.filteredIngredients = this.doIndexingBasedOnQueryString(pattern);
        this.filteredIngredientsChanged.emit(this.filteredIngredients);
    }

    doIndexingBasedOnQueryString(pattern: RegExp): Ingredient[]{
        return this.shoppingListService.getIngredients().filter((ingredient: Ingredient) => {
            return pattern.test(ingredient.name.toLocaleLowerCase());
        });
    }
}