import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormUpdateShopPage } from './form-update-shop.page';

const routes: Routes = [
  {
    path: '',
    component: FormUpdateShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormUpdateShopPageRoutingModule {}
