import { Component, OnInit, Input } from '@angular/core';

import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'item-calc',
  templateUrl: './item-calc.component.html',
  styleUrls: ['./item-calc.component.scss']
})
export class ItemCalcComponent implements OnInit {

  @Input()
  item: Item;

  constructor(private itemSvc: ItemService) { }

  ngOnInit() {
  }

}
