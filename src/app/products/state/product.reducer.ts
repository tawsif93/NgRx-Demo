import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.action';

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
            currentProduct: { ...action.payload },
            currentProductId: action.payload.id,
          };
        case ProductActionTypes.ClearCurrentProduct:
          return {
            ...state,
            currentProduct: null,
            currentProductId: null,
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
            },
            currentProductId: 0,
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
        case ProductActionTypes.UpdateProductSuccess:
          const updatedProducts = state.products.map(
            item => action.payload.id === item.id ? action.payload : item);
          return {
            ...state,
            products: updatedProducts,
            currentProduct: { ...action.payload },
            currentProductId: action.payload.id,
            error: ''
          };
        case ProductActionTypes.UpdateProductFail:
          return {
            ...state,
            error: action.payload
          };
        // After a create, the currentProduct is the new product.
        case ProductActionTypes.CreateProductSuccess:
            return {
            ...state,
            products: [...state.products, action.payload],
            currentProduct: { ...action.payload },
            currentProductId: action.payload.id,
            error: ''
            };

        case ProductActionTypes.CreateProductFail:
            return {
            ...state,
            error: action.payload
            };

        // After a delete, the currentProduct is null.
        case ProductActionTypes.DeleteProductSuccess:
            return {
            ...state,
            products: state.products.filter(product => product.id !== action.payload),
            currentProductId: null,
            currentProduct: null,
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
