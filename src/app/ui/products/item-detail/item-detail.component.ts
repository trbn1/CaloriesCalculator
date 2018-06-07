import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';
import { Save } from '../shared/item';
import { FormsModule } from '@angular/forms';

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
