import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBillPage } from './user-bill.page';

const routes: Routes = [
  {
    path: '',
    component: UserBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBillPageRoutingModule {}
