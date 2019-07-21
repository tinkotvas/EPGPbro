import { Injectable } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Item } from './components/gpcalc/item';

@Injectable()
export class SearchService {
  constructor() {
    // console.log(JSON.stringify(itemsJson.map((item) => {
    //   item.gp = (new Item(item).gp)
    //   console.log(item.gp )
    //   return item;
    // })))
  }
  itemsJson = require('./components/gpcalc/items.json');

  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(100),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term): any {
    return of(this.itemsJson.filter((item) => {
      return (item.name).toLowerCase().includes(term.toLowerCase())
    }));
  }
}