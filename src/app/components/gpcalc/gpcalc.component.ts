import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search-service.service';
import { Subject } from 'rxjs';

const itemSlots = [
  {
    name: 'Head, Chest, Legs, 2H Weapon',
    value: 1
  },
  {
    name: 'Shoulder, Hands, Waist, Feet',
    value: 0.77
  },
  {
    name: 'Trinket',
    value: 0.7
  },
  {
    name: 'Wrist, Neck, Back, Finger, Off-hand, Shield',
    value: 0.55
  },
  {
    name: '1H Weapon, Ranged Weapon, Wand',
    value: 0.42
  }];
const itemValues = {
  uncommon: (ilvl) => {
    return (ilvl - 4) / 2;
  },
  rare: (ilvl) => {
    return (ilvl - 1.84) / 1.6;
  },
  epic: (ilvl) => {
    return (ilvl - 1.3) / 1.3;
  }
};


@Component({
  selector: 'app-gpcalc',
  templateUrl: './gpcalc.component.html',
  styleUrls: ['./gpcalc.component.scss'],
  providers: [SearchService]
})
export class GpcalcComponent implements OnInit {
  itemSlots = itemSlots;
  itemValues = itemValues;
  itemSearch = "";
  itemRarity = 'rare';
  slotValue = this.itemSlots[0].value;
  selectedItem;
  itemLevel = 1;



  suggestedItems;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
    .subscribe((results:any) => {
      this.suggestedItems = results;
    });
  }

  ngOnInit() { 

  }

  choseItem(entry){
    this.selectedItem = this.suggestedItems.filter(item => {
      return item.entry === entry;
    });
    if(this.selectedItem.length > 0){
      this.suggestedItems = [];
      this.itemLevel = this.selectedItem[0].ItemLevel;
      this.itemRarity = "epic"; //TODO
    }
  }

  gpCostValue()
  {
    const itemValue = this.itemValues[this.itemRarity](this.itemLevel);
    // tslint:disable-next-line: no-bitwise
    return ~~(itemValue * itemValue * 0.04 * this.slotValue);
  }

}
