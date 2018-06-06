import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Item } from './item';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  private basePath = '/add';

  itemsRef: AngularFireList<Item>;
  // itemRef:  AngularFireObject<Item>;

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.itemsRef = db.list('/add');
  }

  // Return an observable list of Items
  getItemsList(): Observable<Item[]> {
    return this.itemsRef.snapshotChanges().pipe(map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
    }));
  }

  // Return a single observable item
  getItem(key: string): Observable<Item | null> {
    const itemPath = `${this.basePath}/${key}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<Item | null>;
    return item;
  }

  addProductData(item: Item): void {
    this.afs.collection('products').add({
      pid: item.pid,
      cat: item.cat,
      name: item.name,
      quantity: item.quantity,
      energy: item.energy,
      protein: item.protein,
      fat: item.fat,
      carb: item.carb,
      fiber: item.fiber,
      photo: item.photo,
      timestamp: item.timestamp,
    })
    .then((ref) => {
      console.log('Added document with ID: ', ref.id);
    });
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.itemsRef.remove(key);
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.itemsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
