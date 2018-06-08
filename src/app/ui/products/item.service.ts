import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private basePath = '/products';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

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

  addProductData(item: Item): void {
    this.afs.collection('products').doc(`${item.pid}`).set({
      pid: item.pid,
      uid: item.uid,
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
    });
  }
}
