import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  isOpen: boolean = false;
  constructor(private elementRef: ElementRef) {}

  // Dynamic binding (on hovering over and out to the host element) of class 'show' to the host element 
  //where appDropdown directive sits on when 'isOpen' property turns out to be true;
  @HostBinding('class.show') get open() {
    return this.isOpen;
  }

  set open(val) {
    this.isOpen = val;
  }

  @HostListener('mouseover') onMouseOver() {
    this.open = false;
    console.log(this.elementRef.nativeElement);
  }

  @HostListener('mouseout') onmouseout() {
    this.open = true;
  }
}
