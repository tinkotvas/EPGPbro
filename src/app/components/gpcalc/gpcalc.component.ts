import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./gpcalc.component.scss']
})
export class GpcalcComponent implements OnInit {
  itemSlots = itemSlots;
  itemValues = itemValues;
  itemLevel = 1;
  slotValue = this.itemSlots[0].value;
  itemRarity = 'rare';
  gpCost = 0;

  constructor() { }

  ngOnInit() { }

  gpCostValue()
  {
    const itemValue = this.itemValues[this.itemRarity](this.itemLevel);
    // tslint:disable-next-line: no-bitwise
    return ~~(itemValue * itemValue * 0.04 * this.slotValue);
  }

}
