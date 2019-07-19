import { Injectable } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



const itemsJson = require('./components/gpcalc/items.json');

@Injectable()
export class SearchService {
  constructor() { 
    // console.log(JSON.stringify(itemsJson.filter((item)=>{
    //   return (item.Quality > 1 && item.InventoryType > 0);
    // })))
  }

  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term): any {
    const regex = new RegExp(term, 'gi');

    return of(itemsJson.filter((item) => {
      return regex.test(item.name);
    }));
  }
}