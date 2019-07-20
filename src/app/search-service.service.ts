import { Injectable } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



const itemsJson = require('./components/gpcalc/items.json');

@Injectable()
export class SearchService {
  constructor() { }
  
  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(50),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term): any {
    const regex = new RegExp(term, 'gi');
    return of(itemsJson.filter((item) => {
      return regex.test(item.name);
    }));
  }
}