import { Ingredient, INGREDIENTS } from "../header/shared/ingredients.model";

import { Subject, Observable } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientsCleared = new Subject<void>();
    ingredientEditing = new Subject<number>();

    private ingredients: Ingredient[] = INGREDIENTS;

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredientWithId(id: number) {
        return this.ingredients[id];
    }

    addIngredientInShoppingList(ingredient: Ingredient) {
        // Logic not to add null object into the array
        if(ingredient) {
            // Logic for not to add duplicate items in shopping list array.
            const matchedIngredient = this.ingredients.find((ing: Ingredient) => {
                return ing.name === ingredient.name;
            });
            if(matchedIngredient) {
                alert("Item is already in shopping list. Please add different item in shopping list or remove the existing item first then add this item.");
                return;
            }
            this.ingredients.push(ingredient);
            this.ingredientsChanged.next(this.ingredients);
        }
    }

    addIngredientsInShoppingList(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients);
    }

    clearShoppingList() {
        this.ingredients.splice(0);
        this.ingredientsCleared.next();
    }

    deleteIngredientFromShoppingList(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.ingredients);
    }

    updateShoppingList(id: number, ingredient: Ingredient) {
        this.ingredients[id] = ingredient;
        this.ingredientsChanged.next(this.ingredients);
    }

}