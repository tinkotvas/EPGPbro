import { Injectable } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
    this.getItems();
  }
  public loading = true;
  localItems;
  filters = {
    sixty: (i) => {
      return i.RequiredLevel > 59;
    }
  };

  getItems() {
    this.http.get('/items').subscribe(items => {
      this.localItems = items;
      this.loading = false;
    });
  }
  search(terms: Observable<any>, f?) {
    return terms.pipe(
      debounceTime(200),
      switchMap(term => this.searchEntries(term, f)));
  }

  searchEntries(term, f?): any {
    return this.localItems == null ? of([]) : of(
      this.localItems.filter(
        (item) => {
          let filterPass = true;
          try {
            filterPass = this.filters[f](item);
          } catch { }

          try {
            return ((item.name).toLowerCase().includes(term.toLowerCase()) && filterPass);
          } catch
          {
            return false;
          }
        }).sort(
          (a, b) => {
            return b.ItemLevel - a.ItemLevel;
          }).slice(0, 100));
  }
}
