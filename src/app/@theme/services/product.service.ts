import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Products, productResponse } from '../types/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject = new Subject<Products[]>();
  product: Observable<Products[]> = this.productSubject.asObservable();
  productData: Products[] = [];

  // constructor
  constructor(private http: HttpClient) {}

  getProduct(): void {
    this.http.get<productResponse>(`${environment.apiUrl}/api/products/list`).subscribe((data) => {
      this.productSubject.next(data.products);
      this.productData = data.products;
    });
  }
}
