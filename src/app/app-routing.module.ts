import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: 'destination',
    loadChildren: () => import('./destination/destination.module').then( m => m.DestinationPageModule),
    canLoad: [authGuard]
  },
  {
    path: '',
    redirectTo: 'destination',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
