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
  suggestedItems;
  itemModel = new Item();
  searchTerm$ = new Subject<string>();
  classToggle;
  doubleClick;

  @HostBinding('class') classes = 'container-fluid result';

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
    .subscribe((results: any) => {
      this.suggestedItems = results;
    });
  }

  ngOnInit() { }

  choseItem(entry, event){
    event.preventDefault();
    event.stopPropagation();
    if(event.ctrlKey || this.doubleClick === entry){
      window.open(event.target.href, '_blank')
    }
    if(this.classToggle){
      this.classToggle.classList.remove('chosen');
    }
    this.doubleClick = entry;
    this.classToggle = event.target;
    event.target.classList.add('chosen')
    const found = this.suggestedItems.filter(item => {
      return item.entry === entry;
    });
    this.itemModel = new Item(found[0]);
  }
}
