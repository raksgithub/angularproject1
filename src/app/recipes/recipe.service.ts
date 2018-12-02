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
        return this.recipes.find((recipe) => {
            return recipe.id === id;
        })
    }

    addNewRecipe(name: string, desc: string, imgUrl: string, ingredients: Ingredient[]) {
        if(name && desc && imgUrl) {
            this.recipes.push({ id: this.recipes.length + 1, name: name, desc: desc, imageURL: imgUrl, ingredients: ingredients });
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        for(let recipe of this.recipes) {
            if(recipe.id === id) {
                recipe.name = newRecipe.name;
                recipe.desc = newRecipe.desc;
                recipe.imageURL = newRecipe.imageURL;
                this.recipesUpdated.next(recipe);
                return;
            }
        }
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id - 1, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    sendIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsInShoppingList(ingredients);
    }
}