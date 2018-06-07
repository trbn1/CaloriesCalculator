import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { QueryFn } from 'angularfire2/firestore/interfaces';

import { Item } from './item';

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';

@Injectable()
export class ItemService {

  private basePath = '/products';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  addProductData(item: Item): void {
    this.afs.collection('products').doc(`${item.pid}`).set({
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
    .then(() => {
      console.log('Added document with ID: ', item.pid);
    });
  }

  // Return an observable list of Items
  getItemsList$(ref?: QueryFn): Observable<Item[]> {
    return this.afs.collection<Item>(this.basePath, ref).snapshotChanges().pipe(map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Item;
        const path = data.photo;
        const photoRef = this.storage.ref(path);
        data.photoUrl = from(photoRef.getDownloadURL());
        return { ...data };
      });
    }));
  }

  private handleError(error: Error) {
    console.error(error);
  }
}
