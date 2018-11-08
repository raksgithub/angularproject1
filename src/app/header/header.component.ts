import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onFeature = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  displayFeature(feature: string) {
    this.onFeature.emit(feature);
  }

}
