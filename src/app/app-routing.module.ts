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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
