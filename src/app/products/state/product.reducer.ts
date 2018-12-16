import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes, ClearCurrentProduct } from './product.action';

export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number;
    currentProduct: Product;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    currentProductId: null,
    currentProduct: null,
    products: [],
    showProductCode: true,
    error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);


export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);
// export const getCurrentproduct = createSelector(
//     getProductFeatureState,
//     getCurrentProductId,
//     (state , currentProductId) => state.products.find( p => p.id === currentProductId)
// );

export const getCurrentproduct = createSelector(
    getProductFeatureState,
    (state ) => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
          return {
            ...state,
            showProductCode: action.payload
          };
        case ProductActionTypes.SetCurrentProduct:
          return {
            ...state,
            currentProduct: { ...action.payload }
          };
        case ProductActionTypes.ClearCurrentProduct:
          return {
            ...state,
            currentProduct: null
          };
        case ProductActionTypes.InitializeCurrentProduct:
          return {
            ...state,
            currentProduct: {
              id: 0,
              productName: '',
              productCode: 'New',
              description: '',
              starRating: 0
            }
          };
        case ProductActionTypes.LoadSuccess:
          return {
              ...state,
              products: action.payload,
              error: '',
          };
        case ProductActionTypes.LoadFail:
          return {
              ...state,
              products: [],
              error: action.payload
          };
        default:
            return state;
    }
}
