import { Component } from '@angular/core';
import { CartCountService } from '../cart-count.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  constructor(public cartCountService:CartCountService){

  }
}
