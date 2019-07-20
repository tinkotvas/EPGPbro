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
      id?: number,
      name?: string,
      quality?: number,
      qualityString?: string,
      itemLevel?: number,
      inventoryType?: number,
      inventoryTypeValue?: number,
      gp?: number
    } = {}
  ) {
    this.id = p.id;
    this.name = p.name || '';
    this.quality = p.quality || 0;
    this.qualityString = this.qualityStringFn();
    this.itemLevel = p.itemLevel || 0;
    this.inventoryType = p.inventoryType || 0;
    // tslint:disable-next-line: no-unused-expression
    this.inventoryTypeValue = this.invTypeValue();
    this.gp = this.gpCostValue();
  }

    qualityStringFn(): string {
        let type: string;

        switch (this.quality) {
            case 2:
                type = 'uncommon';
                break;
            case 3:
                type = 'rare';
                break;
            case 4:
                type = 'epic';
                break;
            case 5:
                type = 'legendary';
                break;
            default:
                type = 'normal';
        }
        return type;
    }


    invTypeValue() {
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

        let choice = 4;
        if (this.inventoryType === 1) {
            choice = 0;
        }

        return itemSlots[choice].value;
    }

    gpCostValue() {
        let val = 0;
        const itemValues = {
            uncommon: () => {
                return (this.itemLevel - 4) / 2;
            },
            rare: () => {
                return (this.itemLevel - 1.84) / 1.6;
            },
            epic: () => {
                return (this.itemLevel - 1.3) / 1.3;
            }
        };
        if(this.quality === 4 || this.quality === 5 ){
            val = (this.itemLevel - 1.3) / 1.3;
        }else if (this.quality === 3){
            val = (this.itemLevel - 1.84) / 1.6;
        }else{
            val = (this.itemLevel - 4) / 2;
        }

        // tslint:disable-next-line: no-bitwise
        return ~~(val * val * 0.04 * this.inventoryTypeValue);
    }

}
