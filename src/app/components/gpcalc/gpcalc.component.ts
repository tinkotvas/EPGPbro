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

  @HostBinding('class') classes = 'container-fluid';

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
    .subscribe((results: any) => {
      this.suggestedItems = results;
    });
  }

  ngOnInit() { }

  choseItem(entry, event){
    if(this.classToggle){
      this.classToggle.classList.remove('chosen');
    }
    event.preventDefault();
    event.stopPropagation();
    this.classToggle = event.target;
    event.target.classList.add('chosen')

    if(event.ctrlKey){
      window.open(event.target.href, '_blank')
    }
    const found = this.suggestedItems.filter(item => {
      return item.entry === entry;
    });

    this.itemModel = new Item({
      entry: found[0].entry,
      name: found[0].name,
      ItemLevel: found[0].ItemLevel,
      InventoryType: found[0].InventoryType,
      Quality: found[0].Quality,
      gp: found[0].gp
    });
  }
}
