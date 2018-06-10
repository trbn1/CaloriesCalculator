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

  @SessionStorage({key: 'saves'}) saves: Array<Item> = [];

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
    const multiplier = numInputQuantity / numQuantity;

    this.item.energy = (numEnergy * multiplier);
    this.item.protein = (numProtein * multiplier);
    this.item.fat = (numFat * multiplier);
    this.item.carb = (numCarb * multiplier);
    this.item.fiber = (numFiber * multiplier);
  }

  saveItem() {
    if (this.saves === null) {
      sessionStorage.setItem('ngx_saves', '[]');
    }
    this.saves.push(this.item);
    console.log(this.saves);
  }

}
