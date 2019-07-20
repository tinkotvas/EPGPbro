import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search-service.service';
import { Subject } from 'rxjs';
import { Item } from './item';

@Component({
  selector: 'app-gpcalc',
  templateUrl: './gpcalc.component.html',
  styleUrls: ['./gpcalc.component.scss'],
  providers: [SearchService],
  host: {'class':'container-fluid'}
})
export class GpcalcComponent implements OnInit {
  suggestedItems;
  itemModel = new Item();
  searchTerm$ = new Subject<string>();
  classToggle;

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
      window.open(event.target.href,'_blank')
    }
    const found = this.suggestedItems.filter(item => {
      return item.entry === entry;
    });

    this.itemModel = new Item({
      id: found[0].entry,
      name: found[0].name,
      itemLevel: found[0].ItemLevel,
      inventoryType: found[0].InventoryType,
      quality: found[0].Quality
    });
  }
}
