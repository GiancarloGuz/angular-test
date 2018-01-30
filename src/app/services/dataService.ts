import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) {

  }

  public getProducts() {
    return this.http.get('https://api.mlab.com/api/1/databases/wondersign/collections/products?apiKey=B_o7qfV7j4diajcASjmKeB4sBzaBs76e')
      .map((res) => res.json());
  }

  public getProduct(id) {
    return this.http.get('https://api.mlab.com/api/1/databases/wondersign/collections/products/' + id + '?apiKey=B_o7qfV7j4diajcASjmKeB4sBzaBs76e')
      .map((res) => res.json());
  }

  public postProduct(product) {
    return this.http.post('https://api.mlab.com/api/1/databases/wondersign/collections/products?apiKey=B_o7qfV7j4diajcASjmKeB4sBzaBs76e', product)
      .map((res) => res.json());
  }

  public putProducts(product) {
    return this.http.put('https://api.mlab.com/api/1/databases/wondersign/collections/products/' + product.id + '?apiKey=B_o7qfV7j4diajcASjmKeB4sBzaBs76e', product)
      .map((res) => res.json());
  }
  public deleteProduct(productId) {
    return this.http.delete('https://api.mlab.com/api/1/databases/wondersign/collections/products/' + productId + '?apiKey=B_o7qfV7j4diajcASjmKeB4sBzaBs76e')
      .map((res) => res.json());
  }
}
