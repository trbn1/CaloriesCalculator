import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../ui.module';
import { ItemCalcComponent } from './item-calc/item-calc.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from '../user-panel/add/item-form/item-form.component';

import { ItemService } from './item.service';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ItemCalcComponent,
    ItemDetailComponent,
    ItemListComponent,
    ItemFormComponent
  ],
  providers: [ItemService]
})
export class ItemModule { }
