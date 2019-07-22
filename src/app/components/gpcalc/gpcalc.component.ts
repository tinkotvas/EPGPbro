import { Component, OnInit, HostBinding } from '@angular/core';
import { SearchService } from '../../search-service.service';
import { Subject } from 'rxjs';
import { Item } from './item';

@Component({
  selector: 'app-gpcalc',
  templateUrl: './gpcalc.component.html',
  styleUrls: ['./gpcalc.component.scss'],
  providers: [SearchService]
})
export class GpcalcComponent implements OnInit {
  ITEM_MODEL = new Item(); // model for gp result
  INPUT_SEARCH; // search input
  suggestedItems; // store items here
  searchTerm$ = new Subject<string>();

  activeFilter;
  filter60 = {
    true: 'sixty',
    false: null
  };


  searchSub;

  @HostBinding('class') classes = 'container-fluid result';

  constructor(private searchService: SearchService) {
    this.setSubscribe();
  }

  setFilter(e) {
    this.activeFilter = this.filter60[e.target.checked];
    this.searchSub.unsubscribe();
    this.setSubscribe();
    this.searchTerm$.next(this.INPUT_SEARCH);
  }

  ngOnInit() { }

  setSubscribe() {
    this.searchSub = this.searchService.search(this.searchTerm$, this.activeFilter)
      .subscribe((results: any) => {
        this.suggestedItems = results;
      });
  }

  inputKeyDown(e) {
    switch (e.key) {
      case 'Esc':
      case 'Escape':
        this.INPUT_SEARCH = '';
        break;
      default:
        return;
    }
  }

  // tslint:disable-next-line: member-ordering
  prevClick; doubleClick;
  choseItem(entry, event) {
    event.preventDefault();
    event.stopPropagation();
    /* if we click two times on the same entry, open it */
    if (this.doubleClick === entry) { window.open(event.target.href, '_blank'); }
    try { this.prevClick.classList.remove('chosen'); } catch { } finally { event.target.classList.add('chosen'); }
    this.doubleClick = entry;
    this.prevClick = event.target;
    this.ITEM_MODEL = new Item(this.suggestedItems.find(item => item.entry === entry));
  }
}
