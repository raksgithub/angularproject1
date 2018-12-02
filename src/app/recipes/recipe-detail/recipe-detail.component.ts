import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/header/shared/ingredients.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeUpdateSubscription: Subscription;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.recipe = this.recipeService.getRecipeById(+params.get('id'));
      })
    this.recipeUpdateSubscription = this.recipeService.recipesUpdated.subscribe(recipe => this.recipe = recipe);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
  }

  sendIngredientsToSL() {
    this.recipeService.sendIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnDestroy() {
    this.recipeUpdateSubscription.unsubscribe();
  }

}
