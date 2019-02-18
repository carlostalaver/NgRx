import { Product } from './../product';
import { Action } from '@ngrx/store';
import { ProductActionTypes } from './product.actions';
//#endregion
//#region Crear un nuevo producto
export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CreateProduct;
  constructor(public payload: Product) { }
}
