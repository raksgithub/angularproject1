import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/header/shared/ingredients.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  searchAllowed: boolean = false;
  editMode: boolean = false;
  editId: number;
  editingIngredient: Ingredient;
  ingredientEditingSubscription: Subscription;
  @Output('onToggle') onToggleSearch = new EventEmitter<boolean>();
  constructor(private shoppingListService: ShoppingListService, private searchService: SearchService) { }

  ngOnInit() {
    this.ingredientEditingSubscription = this.shoppingListService.ingredientEditing.subscribe(
      (id) => {
        this.editMode = true;
        this.editId = id;
        this.editingIngredient = this.shoppingListService.getIngredientWithId(id);
        this.slForm.setValue({
          name: this.editingIngredient.name,
          qty: this.editingIngredient.quantity
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    if(form.value) {
      if(this.editMode) {
        this.shoppingListService.updateShoppingList(this.editId, {name: form.value.name, quantity: form.value.qty});
      } else {
        this.shoppingListService.addIngredientInShoppingList({name: form.value.name, quantity: form.value.qty});
      }
    }
    form.resetForm();
    this.editMode = false;
  }

  clearShoppingList() {
    this.shoppingListService.clearShoppingList();
  }

  toggleSearch() {
    this.searchAllowed = !this.searchAllowed;
    this.onToggleSearch.emit(this.searchAllowed); 
  }

  indexItem(queryString: string) {
    if(this.shoppingListService.getIngredients().length !== 0) {
      this.searchService.searchQuery(queryString);
    }
  }

  ngOnDestroy() {
    this.ingredientEditingSubscription.unsubscribe();
  }
}
