import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  
  images= [
    {name: "pastry.jpg", caption: "hamur işi"},
    {name: "soup.jpg", caption: "çorba"},
    {name: "cooked_food.jpg", caption: "sulu yemek"},
    {name: "spagetti.jpg", caption: "spagetti"}
  ];

}
