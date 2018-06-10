import { Component, OnInit, Input } from '@angular/core';

import { SessionStorage } from 'ngx-store';

import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  @Input()
  item: Item;

  @SessionStorage({key: 'save'}) save: Array<number> = [];

  isModalActive = false;
  currentQuantity: number;
  currentEnergy: number;
  currentProtein: number;
  currentFat: number;
  currentCarb: number;
  currentFiber: number;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  toggleModal() {
    this.currentQuantity = this.item.quantity;
    this.currentEnergy = this.item.energy;
    this.currentProtein = this.item.protein;
    this.currentFat = this.item.fat;
    this.currentCarb = this.item.carb;
    this.currentFiber = this.item.fiber;
    this.isModalActive = !this.isModalActive;
  }

  calculateValue(inputQuantity: number) {
    const numInputQuantity = inputQuantity;
    const numQuantity = this.currentQuantity;
    const numEnergy = this.currentEnergy;
    const numProtein = this.currentProtein;
    const numFat = this.currentFat;
    const numCarb = this.currentCarb;
    const numFiber = this.currentFiber;

    this.item.energy = (numEnergy * (numInputQuantity / numQuantity));
    this.item.protein = (numProtein * (numInputQuantity / numQuantity));
    this.item.fat = (numFat * (numInputQuantity / numQuantity));
    this.item.carb = (numCarb * (numInputQuantity / numQuantity));
    this.item.fiber = (numFiber * (numInputQuantity / numQuantity));

  }

  saveItem() {
    this.save.push(this.item.quantity);
    console.log(this.save);
  }
}
