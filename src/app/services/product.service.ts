import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from './../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map((products) => {
        let p = products.find((p) => p.id == id);
        if (p) return p;
        return null;
      })
    );
  }
}
