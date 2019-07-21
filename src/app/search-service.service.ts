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

  search(terms: Observable<any>, f?) {
    return terms.pipe(
      debounceTime(200),
      switchMap(term => this.searchEntries(term, f)));
  }

  searchEntries(term, f?): any {
    return of(
      this.itemsJson.filter(
        (item) => {
          const filters = {
            sixty: (i) => {
              return i.RequiredLevel > 59;
            }
          };

          let filterPass = true;
          try{
            filterPass = filters[f](item);
          }catch {}

          return ((item.name).toLowerCase().includes(term.toLowerCase()) && filterPass);
        }).sort(
          (a, b) => {
            return b.ItemLevel - a.ItemLevel;
          }).slice(0, 100));
  }
}