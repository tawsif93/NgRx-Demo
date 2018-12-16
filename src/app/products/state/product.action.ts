import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle product code',
    SetCurrentProduct = '[Product] Set current product',
    ClearCurrentProduct = '[Product] Clear current product',
    InitializeCurrentProduct = '[Product] Initialize current product',
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load fail',
}


export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;

    constructor( public payload: Product[]) { }
}

export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export type ProductActions = ToggleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | Load
    | LoadSuccess
    | LoadFail;
