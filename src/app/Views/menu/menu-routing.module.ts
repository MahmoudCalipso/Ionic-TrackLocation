import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { MenuPage } from './menu.page';

// const routes: Routes = [
//   {
//     path: 'nav',
//     component: MenuPage,
//     children: [
//       {
//         path: 'home',
//         loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule),
//         canLoad: [AuthGuard]
//       },
//       {
//         path: 'sign-in',
//         loadChildren: () => import('../../Views/sign-in/sign-in.module').then(m => m.SignInPageModule)
//       },
//       {
//         path: 'tracking',
//         loadChildren: () => import('../../Views/tracking/tracking.module').then(m => m.TrackingPageModule),
//         canLoad: [AuthGuard]
//       },
//       {
//         path: 'list-tracking',
//         loadChildren: () => import('../../Views/list-tracking/list-tracking.module').then(m => m.ListTrackingPageModule),
//         canLoad: [AuthGuard]
//       },
//       {
//         path: 'account',
//         loadChildren: () => import('../../Views/account/account.module').then(m => m.AccountPageModule),
//         canLoad: [AuthGuard]
//       },
//       {
//         path: 'show-track',
//         loadChildren: () => import('../../Views/show-track/show-track.module').then(m => m.ShowTrackPageModule),
//         canLoad: [AuthGuard]
//       },
//       {
//         path: '',
//         redirectTo: 'home',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: 'sign-in',
//     loadChildren: () => import('../../Views/sign-in/sign-in.module').then(m => m.SignInPageModule)
//   },

// ];
const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
