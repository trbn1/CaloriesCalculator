import { Component, OnInit, Input } from '@angular/core';

import { SessionStorage, SessionStorageService } from 'ngx-store';

import { AngularFirestore, AngularFirestoreDocument  } from 'angularfire2/firestore';

import { NotifyService } from '../../../core/notify.service';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'item-calc',
  templateUrl: './item-calc.component.html',
  styleUrls: ['./item-calc.component.scss']
})
export class ItemCalcComponent implements OnInit {

  @SessionStorage({key: 'saves'}) saves: Array<Item>;

  isModalActive = false;
  sumQuantity = 0;
  sumEnergy = 0;
  sumProtein = 0;
  sumFat = 0;
  sumCarb = 0;
  sumFiber = 0;

  constructor(
    private itemService: ItemService,
    private afs: AngularFirestore,
    private notify: NotifyService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
  }

  toggleModal() {
    if (this.saves !== null ) {
      if (this.saves.length === 0) {
        this.notify.update('Nie wybrano produktów', 'error');
        return;
      }
    }
    this.sumQuantity = 0;
    this.sumEnergy = 0;
    this.sumProtein = 0;
    this.sumFat = 0;
    this.sumCarb = 0;
    this.sumFiber = 0;
    if (this.saves !== null ) {
      for (const save of this.saves) {
        this.sumQuantity += parseFloat(save.quantity);
        this.sumEnergy += parseFloat(save.energy);
        this.sumProtein += parseFloat(save.protein);
        this.sumFat += parseFloat(save.fat);
        this.sumCarb += parseFloat(save.carb);
        this.sumFiber += parseFloat(save.fiber);
      }
    }
    if (this.sumQuantity === 0) {
      this.notify.update('Nie wybrano produktów', 'error');
      return;
    }
    this.isModalActive = !this.isModalActive;
  }

  removeSave(key: Item) {
    console.log(key);
    key = this.saves.find(value => value.pid === key.pid);
    const id = this.saves.indexOf(key);
    console.log(id);
    this.saves.splice(id, 1);
    console.log(this.saves);
    if (this.saves.length === 0) {
      this.sumQuantity = 0;
      this.sumEnergy = 0;
      this.sumProtein = 0;
      this.sumFat = 0;
      this.sumCarb = 0;
      this.sumFiber = 0;
      this.isModalActive = !this.isModalActive;
      this.notify.update('Usunięto wszystkie produkty z kalkulatora', 'info');
      return;
    }
    this.sumQuantity = 0;
    this.sumEnergy = 0;
    this.sumProtein = 0;
    this.sumFat = 0;
    this.sumCarb = 0;
    this.sumFiber = 0;
    if (this.saves !== null ) {
      for (const save of this.saves) {
        this.sumQuantity += parseFloat(save.quantity);
        this.sumEnergy += parseFloat(save.energy);
        this.sumProtein += parseFloat(save.protein);
        this.sumFat += parseFloat(save.fat);
        this.sumCarb += parseFloat(save.carb);
        this.sumFiber += parseFloat(save.fiber);
      }
    }
  }

  removeSaves() {
    this.toggleModal();
    this.sessionStorageService.clear('prefix');
    this.notify.update('Usunięto wszystkie produkty z kalkulatora', 'info');
  }
}
