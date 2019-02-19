import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Product } from '../product';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService,
              private actions$: Actions) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load)  =>
      this.productService.getProducts().pipe(
        map(products => (new productActions.LoadSuccess(products))), // esto despacha una actions
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );



  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) => this.productService.createProduct(product).pipe(
      map(( newProduct: Product) => (new productActions.CreateProductSuccess(newProduct))),
      catchError(error => of(new productActions.CreateProductFail(error)))
    ))
  );


  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<{}> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) => this.productService.deleteProduct(productId).pipe(
      map(data => (new productActions.DeleteProductSuccess(data))),
      catchError(err => of(new productActions.DeleteProductFail(err)))
    ))
  );


}
