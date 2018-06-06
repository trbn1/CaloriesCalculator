import { Component, OnInit } from '@angular/core';

import { ItemService } from '../shared/item.service';

import { Item } from '../shared/item';

import { Save } from '../shared/item';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class SavedItemsComponent implements OnInit {

  items: Observable<Item[]>;
  saves: Observable<Save[]>;
  showSpinner = true;

  constructor(private itemService: ItemService) {
    this.items = this.itemService.getItemsList();
    this.saves = this.itemService.getSavesList();
  }

  ngOnInit() {
    this.items.subscribe((x) => {
      this.showSpinner = false;
    });
    this.saves.subscribe((x) => {
      this.showSpinner = false;
    });
  }

  deleteItems() {
    this.itemService.deleteAll();
  }
}
