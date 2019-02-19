import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as producActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  componentActive: boolean = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {

/*     this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    ); */

    this.store.dispatch(new producActions.Load());

    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
      });

    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );



    /* this.store.pipe(select(fromProduct.getProducts),
    takeWhile(() => this.componentActive))     //   ----> operador usado para cancelar la suscripcion
    .subscribe(
      (products: Product[]) => this.products = products
      ); */

    /* Para que angular gestione la suscricion y la cancelacion de dicha suscripcion
      de manerea automatica, me suscribo en la PLANTILLA*/
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError)) as Observable<string>;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch( new producActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new producActions.InitializerCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new producActions.SetCurrentProduct(product));
  }

}
