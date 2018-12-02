import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/header/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {
  searchCriteria: string;
  ingredients: Ingredient[];
  constructor(private slService: ShoppingListService, private router: Router) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe(ingredients => this.ingredients = ingredients);
  }

  onClickBack() {
    this.router.navigate(["shopping-list"]);
  }
}
