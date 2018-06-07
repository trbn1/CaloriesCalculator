import { Component, OnInit } from '@angular/core';

import { ItemService } from '../shared/item.service';

import { Item } from '../shared/item';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  items: Observable<Item[]>;
  showSpinner = true;

  constructor(private itemService: ItemService) {
    this.items = this.itemService.getItemsList$();
  }

  ngOnInit() {
    this.items.subscribe((x) => {
      this.showSpinner = false;
    });
  }
}
