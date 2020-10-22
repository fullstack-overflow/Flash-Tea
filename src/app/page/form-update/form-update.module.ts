import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUpdatePageRoutingModule } from './form-update-routing.module';

import { FormUpdatePage } from './form-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormUpdatePageRoutingModule
  ],
  declarations: [FormUpdatePage]
})
export class FormUpdatePageModule { }
