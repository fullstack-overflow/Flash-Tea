import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUpdatePageRoutingModule } from './form-update-routing.module';

import { FormUpdatePage } from './form-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUpdatePageRoutingModule
  ],
  declarations: [FormUpdatePage]
})
export class FormUpdatePageModule {}
