import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
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
  componentActive = true;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(private productService: ProductService,
    private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentproduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.store.dispatch(new productActions.Load());
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive = false ;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
