import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../../../shared/shared.module';

import { ItemService } from './item.service';

import { SavedItemsComponent } from '../item-list/item-list.component';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    SavedItemsComponent,
    ItemDetailComponent,
  ],
  providers: [
    ItemService,
  ],
})
export class SavedItemsModule { }
