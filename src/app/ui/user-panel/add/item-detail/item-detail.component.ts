import { Component, Input } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {

  @Input()
  item!: Item;

  constructor(private itemSvc: ItemService) { }

}
