import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreregisterPageRoutingModule } from './storeregister-routing.module';

import { StoreregisterPage } from './storeregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreregisterPageRoutingModule
  ],
  declarations: [StoreregisterPage]
})
export class StoreregisterPageModule { }
