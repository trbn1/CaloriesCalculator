import { Component, Input } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item, Save } from '../shared/item';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {

  @Input()
  item!: Item;
  @Input()
  save!: Save;

  constructor(private itemSvc: ItemService) { }

  deleteItem() {

    this.itemSvc.deleteItem(this.save.$key);
  }

}
