import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  cart = [
    {
      id : 1,
      imgurl: 'assets/images/slide1.jpg',
      name: 'Multi color bags',
      category: 'shopping',
      price: 67,
      totalStock: 10
    }, {
      id : 2,
      imgurl: 'assets/images/slide3.jpg',
      name: 'Daily use bags',
      category: 'routine',
      price: 37,
      totalStock: 10
    }, {
      id : 3,
      imgurl: 'assets/images/slide2.jpg',
      name: 'Real Value',
      category: 'folk',
      price: 77,
      totalStock: 10
    }, {
      id : 4,
      imgurl: 'assets/images/slide1.jpg',
      name: 'Vosto bags',
      category: 'shopping',
      price: 65,
      totalStock: 10
    }
  ];
  total_price: any;
  constructor() { }

  ngOnInit() {}

  removeItem(index) {
    this.removeLocalCartItem(index);
  }

  removeLocalCartItem(index) {
    this.total_price -= this.calculatePrice(this.cart[index]);
    this.cart.splice(index, 1);
  }

  calculatePrice(product) {
    let price = product['price'];
    return Number(product['cartQuantity']) * Number(price); 
  }


  placeOrder() {
    
  }
}
