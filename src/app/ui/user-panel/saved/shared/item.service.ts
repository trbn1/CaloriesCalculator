import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Item, Save } from './item';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  itemsRef: AngularFireList<Item>;
  // itemRef:  AngularFireObject<Item>;

  savesRef: AngularFireList<Save>;
  // bookRef:  AngularFireObject<Book>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('/add');
    this.savesRef = db.list('/saved');
  }

  // Return an observable list of Items
  getItemsList(): Observable<Item[]> {
    return this.itemsRef.snapshotChanges().pipe(map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { timestamp: snap.key }) );
    }));
  }

  getSavesList(): Observable<Save[]> {
    return this.savesRef.snapshotChanges().pipe(map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { timestamp: snap.key }) );
    }));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.savesRef.remove(key);
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.savesRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
