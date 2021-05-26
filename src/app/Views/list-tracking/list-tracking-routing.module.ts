import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTrackingPage } from './list-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: ListTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTrackingPageRoutingModule {}
