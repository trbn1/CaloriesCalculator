import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';

import { Item } from './item';

import { Save } from './item';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  private basePath = '/products';

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
  }

  // Return an observable list of Items
  getItemsList$(ref?: QueryFn): Observable<Item[]> {
      return this.afs.collection<Item>(this.basePath, ref).snapshotChanges().pipe(map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
}

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
