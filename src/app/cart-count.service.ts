import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CartCountService {
  public cartItem = signal(0);

  increment() {
    this.cartItem.update((val) => val + 1);
  }
}
