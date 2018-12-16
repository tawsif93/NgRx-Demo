import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductActionTypes } from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as productActions from './product.action';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Injectable()
export class ProductEffects {

    @Effect() loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map( (products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError( err => of( new  productActions.LoadFail(err)))
        )));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}
}
