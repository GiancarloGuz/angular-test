import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
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
  templateUrl: './home.component.html',
  animations: [
    trigger('listState', [
      state('inactive', style({
        backgroundColor: '#fff',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  public products: Product[];
  public searchedProduct: Product;
  public taggleUpdated: string;
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    private dataService: DataService
  ) {
    this.taggleUpdated = 'inactive';
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.bringProducts();
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public bringProducts() {
    this.dataService.getProducts().subscribe((fetchedProducts) => {
      this.products = fetchedProducts;
    });
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public deleteProduct(id, arrayPos) {
    this.taggleUpdated = 'active';
    console.log('Im deleting product with ID:' + id);
    console.log('Calling delete method from Service');
    this.dataService.deleteProduct(id).subscribe((response) => {
      console.log(response);
      this.bringProducts();
      this.taggleUpdated = 'inactive';
    });
  }

  public createProduct(name, sku){
    this.taggleUpdated = 'active';
    console.log('Im creating a new product with name:' + name + ' and SKU: ' + sku);
    console.log('Calling post method from Service');
    this.dataService.postProduct({name: name, sku: sku}).subscribe((response) => {
      console.log(response);
      this.taggleUpdated = 'inactive';
      this.bringProducts();
    });
  }

  public updateProduct(id, name, sku){
    // this.taggleUpdated = 'active';
    console.log('Im update a product with name:' + name + ' and SKU: ' + sku);
    console.log('Calling put method from Service');
    // this.dataService.putProducts({id, name, sku}).subscribe((response) => {
    //   console.log(response);
      // this.taggleUpdated = 'inactive';
    //   this.bringProducts();
    // });
  }

  public search(id) {
    console.log('submit button pressed', id);
    this.dataService.getProduct(id).subscribe((response) => {
      console.log('response', response);
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
