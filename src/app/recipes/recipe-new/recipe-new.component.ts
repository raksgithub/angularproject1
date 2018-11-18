import { Component, OnInit } from '@angular/core';
import faker from 'faker';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onAddRecipe(name: string, desc: string) {
    let imgUrl = faker.image.image(image => image);
    this.router.navigate(['../'], { queryParams: { name: name, desc: desc, imgUrl: imgUrl }, relativeTo: this.route });
  }

}
