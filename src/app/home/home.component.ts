import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from './../services/dataService.service';


@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  public products: Product[];
  public searchedProduct: Product;
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    private dataService: DataService
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    this.dataService.getProducts().subscribe((products) => {
      console.log('products',products);
      this.products = products;
    });
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public deleteProduct(id) {
    console.log('Im deleting product with ID:' + id);
    console.log('Calling delete method from Service');
    this.dataService.deleteProduct(id).subscribe((response) => {
      console.log(response);
    });
  }

  public createProduct(name, sku){
    console.log('Im creating a new product with name:' + name + ' and SKU: ' + sku);
    console.log('Calling post method from Service');
    // this.dataService.createProduct({name: name, sku: sku}).subscribe((response) => {
    //   console.log(response);
    // });
  }

  public search(id){
    console.log('submit button pressed', id);
    this.dataService.getProduct(id).subscribe((response) => {
      console.log(response);
      this.searchedProduct = {
        id: response['_id'],
        name: response['name'],
        sku: response['sku']
      };
    });
  }
}

interface Product {
  id: any;
  name: string;
  sku: string;
}
