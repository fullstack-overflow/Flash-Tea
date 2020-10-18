import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormUpdatePage } from './form-update.page';

const routes: Routes = [
  {
    path: '',
    component: FormUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormUpdatePageRoutingModule {}
