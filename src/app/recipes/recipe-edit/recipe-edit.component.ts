import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean = false;
  editingRecipeId: number;
  editRecipe: Recipe;
  editRecipeForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.editingRecipeId = +params.get('id');
        this.editRecipe = this.recipeService.getRecipeById(this.editingRecipeId);
      }
    );
    this.initForm();
    this.editMode = true;
  }

  private initForm() {
    this.editRecipeForm = this.fb.group({
      name: [this.editRecipe.name, [Validators.required], []],
      imageUrl: [this.editRecipe.imageURL, [Validators.required], []],
      desc: [this.editRecipe.desc, [Validators.required], []]
    });
  }

  get name() {
    return this.editRecipeForm.get('name') as FormControl;
  }

  get imageUrl() {
    return this.editRecipeForm.get('imageUrl') as FormControl;
  }

  get desc() {
    return this.editRecipeForm.get('desc') as FormControl;
  }

  onEditSave() {
    //console.log(`Recipe new name: ${this.name.value}`);
    let newRecipe = new Recipe(this.name.value, this.desc.value, this.imageUrl.value, []);
    this.recipeService.updateRecipe(this.editRecipe, newRecipe);
    this.router.navigate(['../../', this.editingRecipeId], {relativeTo: this.route});
  }
}
