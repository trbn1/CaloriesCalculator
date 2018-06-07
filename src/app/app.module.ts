import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AddItemModule } from './ui/user-panel/add/shared/item.module';
import { SavedItemsModule } from './ui/user-panel/saved/shared/item.module';
import { CalculatorModule } from './ui/products/shared/item.module';
import { UiModule } from './ui/shared/ui.module';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AddItemModule,
    SavedItemsModule,
    CalculatorModule,
    UiModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    NgbModule.forRoot(),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
