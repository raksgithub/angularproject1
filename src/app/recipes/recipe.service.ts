import { Recipe, Recipes } from "./recipe.model";
import { Subject } from "rxjs";
import { Ingredient } from "../header/shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = Recipes;
    recipesChanged = new Subject<Recipe[]>();
    recipesUpdated = new Subject<Recipe>();

    constructor(private slService: ShoppingListService) {}

    // Recipe API

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
        return this.recipes[id];
    }

    getRecipeId(recipe: Recipe) {
        const id = this.recipes.indexOf(recipe);
        return id;
    }

    addNewRecipe(name: string, desc: string, imgUrl: string, ingredients: Ingredient[]) {
        if(name && desc && imgUrl) {
            this.recipes.push({ name: name, desc: desc, imageURL: imgUrl, ingredients: ingredients });
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    updateRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
        for(let recipe of this.recipes) {
            if(recipe === oldRecipe) {
                recipe.name = newRecipe.name;
                recipe.desc = newRecipe.desc;
                recipe.imageURL = newRecipe.imageURL;
                this.recipesUpdated.next(recipe);
                return;
            }
        }
    }

    deleteRecipe(recipe: Recipe) {
        const index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
        console.log(this.recipes.slice());
        this.recipesChanged.next(this.recipes.slice());
    }

    sendIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsInShoppingList(ingredients);
    }
}