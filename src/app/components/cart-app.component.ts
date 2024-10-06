import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogoComponent,CartComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products:Product[] = [];

  items:CartItem[]=[];

  total:number = 0;

  constructor(private service:ProductService){

  }
  ngOnInit(): void {
    this.products=this.service.findAll();
  }

  onAddCard(product:Product):void
    {
      const hasItem =this.items.find(item=>item.product.id === product.id);
      if(hasItem){
        this.items =this.items.map(item=>{
          if(item.product.id === product.id){
            return{
              ...item,
              quality:item.quality +1
            }
          }
          return item;
        })
      }else{
        this.items = [...this.items,{ product:{...product},quality:1}];
      }
      this.calculateTotal();

    }

    onDeleteCart(id:number):void{

      this.items=this.items.filter(item=>item.product.id !== id);
      this.calculateTotal();


    }
    calculateTotal():void{
      this.total = this.items.reduce((accumulator, item)=> accumulator + item.quality * item.product.price,0);

    }

  }
