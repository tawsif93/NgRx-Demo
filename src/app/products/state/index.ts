import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromProducts from './product.reducer';

export interface State extends fromRoot.State {
    products: fromProducts.ProductState;
}

const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>('products');

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

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
          return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

// export const getCurrentproduct = createSelector(
//     getProductFeatureState,
//     (state ) => state.currentProduct
// );

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

