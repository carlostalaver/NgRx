import { Product } from './../product';
import { Action } from '@ngrx/store';

//#region 1ero defino el enum
export enum ProductActionTypes {
  ToggleProductcode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializerCurrentProduct = '[Product] Initializer Current Product',
  Load = '[product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Fail',
  CreateProduct = '[Product] Create Product',
  CreateProductSuccess = '[Product] Create Product Success',
  CreateProductFail = '[Product] Create Product Fail',
  DeleteProduct = '[Product] Delete Product ',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProductFail = '[Product] Delete Product Fail'
}
//#endregion


//#region 2do defino el creador de acciones
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductcode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}


export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  constructor(public payload: null) {}
}

export class InitializerCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializerCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

  //#region  Para actualizar  un producto
    export class UpdateProduct implements Action {
      readonly type = ProductActionTypes.UpdateProduct;

      constructor(public payload: Product) {}
    }
    export class UpdateProductSuccess implements Action {
      readonly type = ProductActionTypes.UpdateProductSuccess;

      constructor(public payload: Product) {}
    }
    export class UpdateProductFail implements Action {
      readonly type = ProductActionTypes.UpdateProductFail;

      constructor(public payload: string) {}
    }
  //#endregion

  //#region Crear un nuevo producto
  export class CreateProduct implements Action {
    readonly type = ProductActionTypes.CreateProduct;

    constructor(public payload: Product) {}
  }
  export class CreateProductSuccess implements Action {
    readonly type = ProductActionTypes.CreateProductSuccess;

    constructor(public payload: Product) {
    }
  }
  export class CreateProductFail implements Action {
    readonly type = ProductActionTypes.CreateProductFail;

    constructor(public payload: string) {}
  }
  //#endregion create new product

  //#region delete product
  export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DeleteProduct;

    constructor(public payload: number) {}
  }
  export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DeleteProductSuccess;

    constructor(public payload: number) {}
  }
  export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DeleteProductFail;

    constructor(public payload: string) {}
  }
  //#endregion delete product

//#endregion

//#region Defino el tipo de union para cada creador
export type ProductActions = ToggleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializerCurrentProduct
    | Load
    | LoadSuccess
    | LoadFail
    | UpdateProduct
    | UpdateProductSuccess
    | UpdateProductFail
    | CreateProduct
    | CreateProductSuccess
    | CreateProductFail
    | DeleteProduct
    | DeleteProductSuccess
    | DeleteProductFail;

//#endregion
