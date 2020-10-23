import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUpdateShopPageRoutingModule } from './form-update-shop-routing.module';

import { FormUpdateShopPage } from './form-update-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUpdateShopPageRoutingModule
  ],
  declarations: [FormUpdateShopPage]
})
export class FormUpdateShopPageModule {}
