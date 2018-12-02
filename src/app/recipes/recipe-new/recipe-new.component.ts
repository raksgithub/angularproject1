import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/header/shared/ingredients.model';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit {

  newRecipeForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.initNewRecipe();
  }

  private initNewRecipe() {
    this.newRecipeForm = this.fb.group({
      name: ["", [Validators.required], []],
      desc: ["", [Validators.required], []],
      imageUrl: ["", [Validators.required], []],
      image: [null, [], []],
      ingredients: this.fb.array([
        this.fb.group({
          name: [null, [], []],
          quantity: [null, [], []]
        })
      ])
    });
  }

  get name() {
    return this.newRecipeForm.get('name') as FormControl;
  }

  get desc() {
    return this.newRecipeForm.get('desc') as FormControl;
  }

  get imageUrl() {
    return this.newRecipeForm.get('imageUrl') as FormControl;
  }

  get image() {
    return this.newRecipeForm.get('image') as FormControl;
  }

  get ingredients() {
    return this.newRecipeForm.get('ingredients') as FormArray;
  }

  addIngredients() {
    this.ingredients.push(this.fb.group({
      name: [null, [], []],
      quantity: [null, [], []]
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.controls.splice(index, 1);
  }

  onAddNewRecipe() {
    //console.log(this.newRecipeForm);
    this.recipeService.addNewRecipe(this.name.value, this.desc.value, this.imageUrl.value, this.ingredients.value);
    //this.recipeService.addIngredients(this.ingredients.value);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
