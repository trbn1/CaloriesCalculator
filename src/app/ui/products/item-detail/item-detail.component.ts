import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item';
import { Save } from '../shared/item';
import { FormsModule } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {

  @Input()
  item!: Item;
  downloadURL!: Observable<string | null>;

  constructor(
    private itemSvc: ItemService,
    private storage: AngularFireStorage,
  ) {
    const path = this.item.photo;
    const ref = this.storage.ref(path);
    this.downloadURL = ref.getDownloadURL();
  }
}
