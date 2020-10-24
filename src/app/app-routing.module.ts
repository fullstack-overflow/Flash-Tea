import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'root',
    loadChildren: () => import('./page/root/root.module').then(m => m.RootPageModule)
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
    path: 'cart',
    loadChildren: () => import('./page/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'form-update',
    loadChildren: () => import('./page/form-update/form-update.module').then(m => m.FormUpdatePageModule)
  },
  {
    path: 'item/:itemId',
    loadChildren: () => import('./page/item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./page/checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'checkout-success',
    loadChildren: () => import('./page/checkout-success/checkout-success.module').then(m => m.CheckoutSuccessPageModule)
  },
  {
    path: 'form-update-shop',
    loadChildren: () => import('./page/form-update-shop/form-update-shop.module').then(m => m.FormUpdateShopPageModule)
  },
  {
    path: 'shop-profile/:shopid',
    loadChildren: () => import('./page/shop-profile/shop-profile.module').then(m => m.ShopProfilePageModule)
  },
  {
    path: 'user-profile/:userid',
    loadChildren: () => import('./page/user-profile/user-profile.module').then(m => m.UserProfilePageModule)
  },
  {
    path: 'user-bill/:userid',
    loadChildren: () => import('./page/user-bill/user-bill.module').then(m => m.UserBillPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
