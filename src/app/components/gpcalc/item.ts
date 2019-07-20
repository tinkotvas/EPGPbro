export class Item {
  id: number;
  name: string;
  quality: number;
  qualityString: string;
  itemLevel: number;
  inventoryType: number;
  inventoryTypeValue: number;
  gp: number;

  constructor(
    p: {
      entry?: number,
      name?: string,
      Quality?: number,
      ItemLevel?: number,
      InventoryType?: number,
      gp?: number
    } = {}
  ) {
    this.id = p.entry;
    this.name = p.name || '';
    this.quality = p.Quality || 0;
    this.qualityString = this.qualityStringFn();
    this.itemLevel = p.ItemLevel || 0;
    this.inventoryType = p.InventoryType || 0;
    this.inventoryTypeValue = this.invTypeValue();
    this.gp = p.gp || this.gpCostValue();
  }

  qualityStringFn(): string {
    switch (this.quality) {
      case 2:
        return 'uncommon';
        break;
      case 3:
        return 'rare';
        break;
      case 4:
        return 'epic';
        break;
      case 5:
        return 'legendary';
        break;
    }
    return 'normal';
  }

  invTypeValue() {
    const it = this.inventoryType;
    if (it === 1 || it === 5 || it === 20 || it === 7 || it === 17) {
      // 'Head, Chest, Legs, 2H Weapon',
      return 1;
    } else if (it === 3 || it === 10 || it === 6 || it === 8) {
      // 'Shoulder, Hands, Waist, Feet',
      return 0.77;
    } else if (it === 12) {
      // 'Trinket',
      return 0.7;
    } else if (it === 9 || it === 2 || it === 16 || it === 11 || it === 23 || it === 14) {
      // 'Wrist, Neck, Back, Finger, Off-hand, Shield',
      return 55;
    } else {
      // '1H Weapon, Ranged Weapon, Wand',
      return 0.42;
    }
  }

  gpCostValue() {
    let val = 0;
    const tq = this.quality;
    if (tq === 4 || tq === 5) {
      val = (this.itemLevel - 1.3) / 1.3; // epic
    } else if (tq === 3) {
      val = (this.itemLevel - 1.84) / 1.6; // rare
    } else {
      val = (this.itemLevel - 4) / 2; // uncommon
    }
    // tslint:disable-next-line: no-bitwise
    return ~~(val * val * 0.04 * this.inventoryTypeValue);
  }
}

/*'
1   head        x
2   neck        x
3   shoulders   x
4
5   chest       x
6   belt/waist  x
7   legs        x
8   boots/feet  x
9   wrist       x
10  gloves      x
11  ring        x
12  trinket     x
13  1h sword    x
14  shield      x
15  bow
16  back        x
17  2h axe
18  hunter bag
19
20  chest
21  1h mace     x
22  1hfistweaponx
23  offhand     x
24
25
26  gun
27
28  relic
*/
