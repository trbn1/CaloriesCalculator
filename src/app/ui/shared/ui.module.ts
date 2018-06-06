import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../shared/shared.module';
import { NavService } from './nav.service';

import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterNavComponent } from '../footer-nav/footer-nav.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ContactComponent,
    AboutComponent,
    UserLoginComponent,
    TopNavComponent,
    FooterNavComponent,
    UserFormComponent,
    LandingPageComponent,
    NotificationMessageComponent,
  ],
  exports: [
    TopNavComponent,
    FooterNavComponent,
    NotificationMessageComponent,
  ],
})
export class UiModule { }
