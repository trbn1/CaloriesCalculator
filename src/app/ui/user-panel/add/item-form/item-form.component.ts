import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap, finalize } from 'rxjs/operators';

import { AuthService } from '../../../../core/auth.service';
import { Item } from '../shared/item';

import { ItemService } from '../shared/item.service';

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent {

  item: Item = new Item();
  downloadURL!: Observable<string>;
  // Main task
  task!: AngularFireUploadTask;

  // Progress monitoring
  percentage!: Observable<number | undefined>;

  snapshot!: Observable<any>;

  constructor(
    private itemSvc: ItemService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

    cats = [
      { name: 'Fastfood', value: 1 },
      { name: 'Kasze, makarony, zboża', value: 2 },
      { name: 'Mięso', value: 3 },
      { name: 'Nabiał i jaja', value: 4 },
      { name: 'Napoje', value: 5 },
      { name: 'Owoce', value: 6 },
      { name: 'Pieczywo', value: 7 },
      { name: 'Warzywa', value: 8 },
      { name: 'Słodycze', value: 9 },
    ];

    addProductData() {
      if (this.item.timestamp === undefined) {
        this.item.timestamp = Date.now();
        this.item.pid = this.afs.createId();
        this.item.photo = 'photos/default';
      }
      this.itemSvc.addProductData(this.item);
      // reset view
      this.item = new Item();
      this.downloadURL = new Observable<string>();
      this.percentage = new Observable<number | undefined>();
      this.snapshot = new Observable<any>();
    }

    startUpload(event: FileList) {
      this.item.timestamp = Date.now();
      this.item.pid = this.afs.createId();
      const path = `photos/${this.item.pid}`;
      this.item.photo = path;

      const file = event.item(0);

      if (file.type.split('/')[0] !== 'image') {
        console.error('Zły format pliku :(');
        return;
      }

      this.task = this.storage.upload(path, file, undefined);

      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        tap((snap: any) => {
          if (snap.bytesTransferred === snap.totalBytes) {
            // Update firestore on completion
            // this.afs.collection('products').add({ path, size: snap.totalBytes });
          }
        }),
        finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
      );
    }

    isActive(snapshot: any) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }
}
