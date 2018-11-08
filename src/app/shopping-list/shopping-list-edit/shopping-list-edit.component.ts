import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('qtyInput') qtyInputRef: ElementRef;
  searchAllowed: boolean = false;
  @Output('onToggle') onToggleSearch = new EventEmitter<boolean>();
  constructor(private shoppingListService: ShoppingListService, private searchService: SearchService) { }

  ngOnInit() {
  }
  addInShoppingList() {
    //this.onAddingIngredients.emit({name: this.nameInputRef.nativeElement.value, quantity: parseInt(this.qtyInputRef.nativeElement.value)});
    const name = this.nameInputRef.nativeElement.value;
    const qty = this.qtyInputRef.nativeElement.value;
    if(name && !isNaN(parseInt(qty))) {
      this.shoppingListService.addIngredientsInShoppingList({name: this.nameInputRef.nativeElement.value, quantity: parseInt(this.qtyInputRef.nativeElement.value)});
    }
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
}
