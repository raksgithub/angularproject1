import { EventEmitter } from "@angular/core";
import { Recipe, Recipes } from "./recipe.model";

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = Recipes;

    getRecipes(): Recipe[] {
        return this.recipes.splice(0);
    }
}