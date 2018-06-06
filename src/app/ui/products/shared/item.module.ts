import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../../shared/shared.module';

import { ItemService } from './item.service';

import { CalculatorComponent } from '../item-list/item-list.component';
import { ItemCalcComponent } from '../item-calc/item-calc.component';
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
    CalculatorComponent,
    ItemCalcComponent,
    ItemDetailComponent,
  ],
  providers: [
    ItemService,
  ],
})
export class CalculatorModule { }
