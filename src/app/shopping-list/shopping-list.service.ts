import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient, INGREDIENTS } from "../header/shared/ingredients.model";
import { SearchService } from "./search.service";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsCleared = new EventEmitter<void>();

    private ingredients: Ingredient[] = INGREDIENTS;

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredientsInShoppingList(ingredient: Ingredient) {
        // Logic not to add duplicate items in shopping list array.
        for(let ing of this.ingredients) {
            if(ing.name === ingredient.name) {
                alert("Item is already in shopping list. Please add different item in shopping list or remove the existing item first then add this item.");
                return;
            }
        }
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    clearShoppingList() {
        this.ingredients.splice(0);
        this.ingredientsCleared.emit();
    }

    deleteIngredientFromShoppingList(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}