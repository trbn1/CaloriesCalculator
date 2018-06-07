import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../shared/item';
import { Save } from '../shared/item';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'item-calc',
  templateUrl: './item-calc.component.html',
  styleUrls: ['./item-calc.component.scss'],
})
export class ItemCalcComponent {

  @Input()
  pid!: string;

  private basePath = '/products';

  save: Save = new Save();

      savesRef: AngularFireList<Save>;
      saveRef!: AngularFireObject<Save>;

      constructor(private db: AngularFireDatabase) {
        this.savesRef = db.list('/products');
      }

      // Default error handling for all actions
      private handleError(error: Error) {
        console.error(error);
      }

      saveItem() {
        this.save.pid = this.pid;
        this.saveItem2(this.save);
        this.save = new Save(); // reset item
      }

      // Create a brand new item
      saveItem2(save: Save): void {
        this.savesRef.push(save);
      }
}
