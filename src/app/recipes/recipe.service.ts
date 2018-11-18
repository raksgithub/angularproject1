import { EventEmitter } from "@angular/core";
import { Recipe, Recipes } from "./recipe.model";

export class RecipeService {

    private recipes: Recipe[] = Recipes;

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
        return this.recipes.find((recipe) => {
            return recipe.id === id;
        })
    }

    addRecipe(name: string, desc: string, imgUrl: string) {
        if(name && desc && imgUrl) {
            this.recipes.push({ id: this.recipes.length + 1, name: name, desc: desc, imageURL: imgUrl });
        }
    }
}