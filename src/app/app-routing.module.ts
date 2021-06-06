import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MenuPage } from './Views/menu/menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'tracking',
        loadChildren: () => import('./Views/tracking/tracking.module').then(m => m.TrackingPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'list-tracking',
        loadChildren: () => import('./Views/list-tracking/list-tracking.module').then(m => m.ListTrackingPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('./Views/account/account.module').then(m => m.AccountPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'show-track/:userId/:locId',
        loadChildren: () => import('./Views/show-track/show-track.module').then(m => m.ShowTrackPageModule),
        canLoad: [AuthGuard]
      },
    ]},
      {
        path: 'sign-in',
        loadChildren: () => import('./Views/sign-in/sign-in.module').then(m => m.SignInPageModule)
      }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
