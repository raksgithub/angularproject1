import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {
          this.recipeService.addNewRecipe(params.get('name'), params.get('desc'), params.get('imgUrl'), []);
          this.recipes = this.recipeService.getRecipes();
        }
      );
    this.recipeChangedSubscription = this.recipeService.recipesChanged.subscribe(recipes => this.recipes = recipes);
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe();
  }

}
