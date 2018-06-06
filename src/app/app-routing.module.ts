import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsListComponent } from './ui/user-panel/add/item-list/item-list.component';
import { SavedItemsComponent } from './ui/user-panel/saved/item-list/item-list.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { AboutComponent } from './ui/about/about.component';
import { CalculatorComponent } from './ui/products/item-list/item-list.component';
import { ContactComponent } from './ui/contact/contact.component';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: CalculatorComponent },
  { path: 'user-panel/add', component: ItemsListComponent,  canActivate: [AuthGuard] },
  { path: 'user-panel/saved', component: SavedItemsComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
