import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SharedModule } from '../../../../shared/shared.module';

import { ItemService } from './item.service';

import { ItemsListComponent } from '../item-list/item-list.component';
import { ItemFormComponent } from '../item-form/item-form.component';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
  ],
  declarations: [
    ItemsListComponent,
    ItemFormComponent,
    ItemDetailComponent,
  ],
  providers: [
    ItemService,
  ],
})
export class AddItemModule { }
