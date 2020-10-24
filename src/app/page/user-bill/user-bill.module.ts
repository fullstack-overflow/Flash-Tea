import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBillPageRoutingModule } from './user-bill-routing.module';

import { UserBillPage } from './user-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBillPageRoutingModule
  ],
  declarations: [UserBillPage]
})
export class UserBillPageModule {}
