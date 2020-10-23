import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProfilePageRoutingModule } from './shop-profile-routing.module';

import { ShopProfilePage } from './shop-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProfilePageRoutingModule
  ],
  declarations: [ShopProfilePage]
})
export class ShopProfilePageModule {}
