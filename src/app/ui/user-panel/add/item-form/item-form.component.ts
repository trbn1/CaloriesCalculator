import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { auth } from 'firebase/app';

import { ItemService } from '../../../products/item.service';
import { NotifyService } from '../../../../core/notify.service';

import { Item } from '../../../products/item';

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  item: Item = new Item();
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  fileName = 'Wybierz plik...';
  submitted = false;

  constructor(
    private itemService: ItemService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private notify: NotifyService,
    public afAuth: AngularFireAuth
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

  reset() {
    this.submitted = false;
    this.item = new Item();
    this.downloadURL = new Observable<string>();
    this.percentage = new Observable<number | undefined>();
    this.snapshot = new Observable<any>();
    this.fileName = 'Wybierz plik...';
  }

  setFileName(event) {
    this.fileName = event.target.files[0].name;
  }

  setSubmitted() {
    this.submitted = true;
  }

  addProductData() {
    if (this.item.cat === undefined || this.item.name === undefined || this.item.quantity === undefined || this.item.energy === undefined) {
      return;
    }
    if (this.item.timestamp === undefined) {
      this.getProductAdditionData();
    }
    this.item.quantity = parseFloat(this.item.quantity.replace(/,/g, '.'));
    this.inputDataIfDoesntExist();
    this.itemService.addProductData(this.item);
    this.notify.update('Pomyślnie dodano produkt', 'success');

    // reset view
    this.reset();
  }

  startUpload(event: FileList) {
    this.getProductAdditionData();
    const path = `photos/${this.item.pid}`;
    this.item.photo = path;

    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      this.notify.update('Zły format pliku', 'error');
      return;
    }

    this.task = this.storage.upload(path, file, undefined);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap((snap) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.afs.collection('products').add({ path, size: snap.totalBytes });
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  getProductAdditionData() {
    this.item.uid = this.getUserID();
    this.item.timestamp = Date.now();
    this.item.pid = this.afs.createId();
    this.item.photo = 'photos/default';
    const array = ['protein', 'fat', 'carb', 'fiber'];
  }

  inputDataIfDoesntExist() {
    if (this.item.protein === undefined) {
      this.item.protein = 0;
    }
    if (this.item.fat === undefined) {
      this.item.fat = 0;
    }
    if (this.item.carb === undefined) {
      this.item.carb = 0;
    }
    if (this.item.fiber === undefined) {
      this.item.fiber = 0;
    }
  }

  getUserID() {
    const user = this.afAuth.auth.currentUser;
    let uid: string;

    if (user != null) {
      uid = user.uid;
      return uid;
    }
  }

  ngOnInit() {
  }

}
