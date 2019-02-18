import { State } from './../../state/app.state';
import { ProductActions, ProductActionTypes } from './product.actions';
import { ProductState } from "./product.reducer";
import { Product } from "./../product";
import * as fromRoot from "../../state/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State extends fromRoot.State {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

// para darle un valor inicial al estado products
const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

//#region para los selectores
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currenteProductId) => {
      if (currenteProductId === 0){
        return {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        };
      } else {
        return currenteProductId ? state.products.find( p => p.id === currenteProductId ) : null;
      }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
//#endregion

export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductcode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload
      };
    case ProductActionTypes.InitializerCurrentProduct:
      return {
        ...state,
        currentProductId: 0
       };
    case ProductActionTypes.LoadSuccess:

      return {
        ...state,
        products: [...action.payload],
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      const updateProducts = state.products.map(item => item.id === action.payload.id ? action.payload : item);
      return{
        ...state,
        products: updateProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.CreateProductSuccess:
       return {
         ...state,
         products: [...state.products, action.payload],
         currentProductId: action.payload.id,
         error: ''
       };

    case ProductActionTypes.CreateProductFail:
       return {
         ...state,
         error: action.payload
       };
    case ProductActionTypes.DeleteProductSuccess:
       const newListProduct = state.products.filter(p => (p.id !== action.payload) ? p : null);
       return {
         ...state,
         products: newListProduct,
         currentProductId: null,
         error: ''
       };
    case ProductActionTypes.DeleteProductFail:
       return {
         ...state,
         error: action.payload
       };
    default:
      return state;
  }
}

