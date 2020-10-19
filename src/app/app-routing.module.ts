import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'root',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./page/root/root.module').then(m => m.RootPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./page/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./page/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'all-list',
    loadChildren: () => import('./page/all-list/all-list.module').then(m => m.AllListPageModule)
  },
  {
    path: 'info-user',
    loadChildren: () => import('./page/info-user/info-user.module').then(m => m.InfoUserPageModule)
  },
  {
    path: 'root',
    loadChildren: () => import('./page/root/root.module').then(m => m.RootPageModule)
  },
  {
    path: 'shop-info',
    loadChildren: () => import('./page/shop-info/shop-info.module').then(m => m.ShopInfoPageModule)
  },
  {
    path: 'storeregister',
    loadChildren: () => import('./page/storeregister/storeregister.module').then(m => m.StoreregisterPageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./page/add-item/add-item.module').then(m => m.AddItemPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./page/info/info.module').then(m => m.InfoPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./page/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'form-update',
    loadChildren: () => import('./page/form-update/form-update.module').then( m => m.FormUpdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
